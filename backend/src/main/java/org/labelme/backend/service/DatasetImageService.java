package org.labelme.backend.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.apigateway.model.Op;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.labelme.backend.dto.DatasetImageDTO;
import org.labelme.backend.model.DatasetImage;
import org.labelme.backend.model.User;
import org.labelme.backend.repository.DatasetImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import javax.swing.text.html.Option;
import javax.xml.crypto.Data;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class DatasetImageService {

    @Autowired
    private DatasetImageRepository datasetImageRepo;

    private AmazonS3 s3client;

    @Value("${amazonProperties.endpointUrl}")
    private String endpointUrl;
    @Value("${amazonProperties.bucketName}")
    private String bucketName;
    @Value("${amazonProperties.accessKey}")
    private String accessKey;
    @Value("${amazonProperties.secretKey}")
    private String secretKey;
    @Value("${amazonProperties.region}")
    private String region;

    @PostConstruct
    private void initializeAmazon() {
        AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);
        this.s3client = AmazonS3Client.builder()
                .withRegion(this.region)
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .build();
    }

    public DatasetImage save(MultipartFile multipartFile, User user) throws IOException {
        String fileName = multipartFile.getOriginalFilename();
        long fileSize = multipartFile.getSize();
        String fileFolder = Integer.toString(user.getId());

        Path filePath = Paths.get(fileFolder, this.formatString(fileName));
        Optional<DatasetImage> datasetImages = this.datasetImageRepo.findByImagePath(filePath.toString());
        if (datasetImages.isPresent()) {
            return null;
        }
        DatasetImage datasetImage = this.datasetImageRepo.save(DatasetImage.builder()
                .owner(user)
                .imagePath(filePath.toString())
                .imageName(fileName)
                .imageSize(fileSize)
                .build());

        File file = convertMultiPartToFile(multipartFile);
        uploadFileTos3bucket(filePath.toString(), file);
        file.delete();
        return datasetImage;
    }

    public Optional<DatasetImageDTO> findById(Long id) {
        DatasetImage datasetImage = this.datasetImageRepo.findById(id).orElse(null);
        if (datasetImage == null) {
            return Optional.empty();
        }
        return Optional.of(DatasetImageDTO.builder().id(datasetImage.getId())
                .name(datasetImage.getImageName())
                .size(datasetImage.getImageSize())
                .url(getSignedImageUrl(datasetImage)).build());
    }


    public Optional<DatasetImage> delete(Long id) {
        Optional<DatasetImage> datasetImage = this.datasetImageRepo.findById(id);
        if (datasetImage.isPresent()) {
            this.s3client.deleteObject(new DeleteObjectRequest(this.bucketName, datasetImage.get().getImagePath()));
            this.datasetImageRepo.delete(datasetImage.get());
        }
        return datasetImage;
    }

    public String getSignedImageUrl(DatasetImage datasetImage) {
        Date expiration = new java.util.Date();
        long expTimeMillis = expiration.getTime();
        expTimeMillis += 1000 * 60 * 60 * 24; // expire after 1 day
        expiration.setTime(expTimeMillis);

        // Generate the presigned URL.
        GeneratePresignedUrlRequest generatePresignedUrlRequest =
                new GeneratePresignedUrlRequest(this.bucketName, datasetImage.getImagePath())
                        .withMethod(HttpMethod.GET)
                        .withExpiration(expiration);
        URL url = this.s3client.generatePresignedUrl(generatePresignedUrlRequest);
        return url.toString();
    }


    private String formatString(String string) {
        return string.replaceAll(" ", "_");
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }

    private void uploadFileTos3bucket(String fileName, File file) {
        PutObjectRequest request = new PutObjectRequest(this.bucketName, fileName, file);
        s3client.putObject(request);
    }
}