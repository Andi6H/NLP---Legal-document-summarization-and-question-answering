from flask import Flask, request, jsonify
from preprocess import load_and_preprocess_data
from question_answering import answer_question
from clause_extraction import extract_entities

app = Flask(__name__)

# Load and preprocess the dataset
df = load_and_preprocess_data('dataset/legal_text_classification.csv')

# Dynamic Question Answering Endpoint
@app.route('/dynamic_qa', methods=['POST'])
def dynamic_qa():
    data = request.json
    question = data['question']
    
    # Simple keyword-based search for relevant context
    keyword = question.split()[0]  # Assume the first word might hint at relevance
    context = df[df['case_text'].str.contains(keyword, case=False, na=False)]['case_text'].values
    
    if len(context) == 0:
        return jsonify({'error': 'No relevant context found for the question.'})
    
    # Use the first matching context for answering
    selected_context = context[0]
    answer = answer_question(question, selected_context)
    
    return jsonify({'question': question, 'context': selected_context, 'answer': answer})

if __name__ == '__main__':
    app.run(debug=True)
