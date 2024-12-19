import re
import spacy
import pandas as pd

# Load the SpaCy model
nlp = spacy.load('en_core_web_sm')

def preprocess_text(text):
    # Ensure the input is a string
    if not isinstance(text, str):  
        return ""
    text = re.sub(r'\s+', ' ', text)  # Remove extra spaces
    doc = nlp(text)
    tokens = [token.lemma_ for token in doc if not token.is_stop and not token.is_punct]
    return ' '.join(tokens)

def load_and_preprocess_data(file_path):
    # Load the dataset
    df = pd.read_csv(file_path)
    
    print(df['case_text'].isna().sum())  # Count missing values
    # Replace NaN values with an empty string and convert to strings
    df['case_text'] = df['case_text'].fillna("").astype(str)
    # Apply the preprocessing function
    df['cleaned_text'] = df['case_text'].apply(preprocess_text)
    return df