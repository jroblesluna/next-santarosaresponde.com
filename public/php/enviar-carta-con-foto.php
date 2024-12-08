<?php

// pages/api/enviar-carta-con-foto.php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $name = $input['name'] ?? null;
    $imageBase64 = $input['imageBase64'] ?? null;

    if (!$name || !$imageBase64) {
        http_response_code(400);
        echo json_encode(['error' => 'Todos los campos son requeridos']);
        exit;
    }

    $openaiApiKey = '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';
    $openaiOrganization = 'org-M7KPs0SFh1En7EALhqxhKb6V';

    if (!$openaiApiKey || !$openaiOrganization) {
        http_response_code(500);
        echo json_encode(['error' => 'La clave de API de OpenAI o la organización no están configuradas']);
        exit;
    }

    try {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://api.openai.com/v1/chat/completions');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $openaiApiKey,
            'OpenAI-Organization: ' . $openaiOrganization,
        ]);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
            'model' => 'gpt-4o-mini',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'Eres Santa Rosa de Lima. Respondes a las cartas de tus devotos con sabiduría y compasión basadas en tu vida y enseñanzas. Tus respuestas tienen al menos 5 párrafos largos. En tus respuestas eres detallada, siempre referencia a algún pasaje de la Biblia o experiencias de tu vida relacionado con las cartas y mencionas la mayoría de los deseos y das consejos o ideas respecto a lo que te escriben en las cartas.',
                ],
                [
                    'role' => 'user',
                    'content' => [
                        [
                            'type' => 'text',
                            'text' => 'Mira esta imagen y responde a la carta que contiene.',
                        ],
                        [
                            'type' => 'image_url',
                            'image_url' => [
                                'url' => 'data:image/jpeg;base64,' . $imageBase64,
                            ],
                        ],
                    ],
                ],
            ],
            'temperature' => 0.7,
            'max_tokens' => 1000,
            'top_p' => 1.0,
            'frequency_penalty' => 0.0,
            'presence_penalty' => 0.0,
        ]));

        $response = curl_exec($ch);
        if (curl_errno($ch)) {
            throw new Exception('Error durante la solicitud a OpenAI: ' . curl_error($ch));
        }

        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        $data = json_decode($response, true);

        if ($http_code !== 200) {
            echo json_encode(['error' => $data['error']['message'] ?? 'Error desconocido']);
            exit;
        }

        if (!isset($data['choices']) || !count($data['choices'])) {
            echo json_encode(['error' => 'La respuesta de OpenAI no contiene "choices".']);
            exit;
        }

        $result = trim($data['choices'][0]['message']['content']);
        echo json_encode(['result' => $result]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Ocurrió un error al generar la respuesta de Santa Rosa']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
}
?>
