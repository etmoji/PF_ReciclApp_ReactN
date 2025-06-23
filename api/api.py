from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from PIL import Image
import numpy as np
import base64
import io
import tensorflow as tf
from tensorflow.keras.models import load_model
app = Flask(__name__)

# Carga el modelo .h5 una vez al iniciar la app

# Multi-Head Attention Layer
class MultiHeadAttentionBlock(tf.keras.layers.Layer):
    def __init__(self, num_heads, attention_dim, **kwargs):
        super(MultiHeadAttentionBlock, self).__init__(**kwargs)
        self.mha = tf.keras.layers.MultiHeadAttention(num_heads=num_heads, key_dim=attention_dim)
        self.norm1 = tf.keras.layers.LayerNormalization(epsilon=1e-6)
        self.dense = tf.keras.layers.Dense(attention_dim, activation='relu')
        self.norm2 = tf.keras.layers.LayerNormalization(epsilon=1e-6)

    def call(self, inputs):
        attn_output = self.mha(inputs, inputs)
        out1 = self.norm1(inputs + attn_output)
        out2 = self.dense(out1)
        return self.norm2(out1 + out2)
    
model = load_model('model/recycling_classifier_attention.h5',
                   custom_objects={'MultiHeadAttentionBlock': MultiHeadAttentionBlock})


# Define las categorías que tu modelo predice
categories = ['Papel', 'Vidrio', 'Cartón', 'Metal', 'Composta', 'Plástico', 'Otros']
    
def preprocess_image(image_bytes):
    # Abrir la imagen
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    # Redimensionar (ajustar al tamaño que espera el modelo)
    image = image.resize((224, 224))
    # Convertir a array numpy y normalizar
    image = img_to_array(image) / 255.0
    # Expandir dims para batch (1, 224, 224, 3)
    image = np.expand_dims(image, axis=0)
    return image

@app.route('/saludar', methods=['GET'])
def saludar():
    return jsonify({'message': '¡Hola! Bienvenido a la API de clasificación de reciclaje.'})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json

        # Obtener la imagen en base64
        img_b64 = data['image']

        # Decodificar base64
        img_bytes = base64.b64decode(img_b64)

        # Preprocesar la imagen para el modelo
        img_tensor = preprocess_image(img_bytes)

        print("Imagen preprocesada:", img_tensor.shape)

        # Hacer predicción
        preds = model.predict(img_tensor)[0]
        max_idx = np.argmax(preds)
        confidence = float(preds[max_idx])

        # Construir respuesta
        response = {
            'category': categories[max_idx],
            'confidence': round(confidence * 100, 1)
        }

        print("Predicción:", response)

        return jsonify(response)

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)