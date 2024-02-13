<?php

// Define your bot token and chat ID
$botToken = '2141594179:AAH8iu1M0bYDGGY4GICvk4l7nBypT1SNCyk';
$chatId = '-1001128097958';

// API endpoint URL
$apiUrl = 'https://the-trivia-api.com/v2/questions?categories=general_knowledge&&limit=1';

// Get trivia question from the API
$response = file_get_contents($apiUrl);
$data = json_decode($response, true);

// Extract question and answer choices
$question = $data[0]['question']['text'];
$correctAnswer = $data[0]['correctAnswer'];
$incorrectAnswers = $data[0]['incorrectAnswers'];

// Create answer options array
$answerOptions = array_merge($incorrectAnswers, [$correctAnswer]);
shuffle($answerOptions);

// Create poll options
$options = [];
foreach ($answerOptions as $option) {
    $options[] = $option;
}

// Create poll
$pollData = [
    'chat_id' => $chatId,
    'question' =>"🤖 This question is from the bot:
". $question,
    'options' => json_encode($options),
    'is_anonymous' => true,
    'type' => 'quiz',
    'correct_option_id' => array_search($correctAnswer, $answerOptions),
];

// Send poll request to Telegram Bot API
$telegramApiUrl = 'https://api.telegram.org/bot' . $botToken . '/sendPoll';
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $telegramApiUrl);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($pollData));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-type: application/x-www-form-urlencoded'));
$result = curl_exec($ch);
curl_close($ch);

// Print the result (for debugging purposes)
echo $result;
