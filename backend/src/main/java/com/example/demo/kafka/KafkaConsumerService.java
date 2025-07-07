package com.example.demo.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    @KafkaListener(topics = "todo-events", groupId = "todo-group")
    public void consume(String message) {
        System.out.println("🚀 Received Kafka message: " + message);
    }
}
