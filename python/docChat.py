
"""
%%writefile requirements.txt
openai
chromadb
langchain
tiktoken
%pip install -r requirements.txt

"""
import os
import platform

import openai
import chromadb
import langchain

from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.text_splitter import TokenTextSplitter
from langchain.llms import OpenAI
from langchain.chains import ChatVectorDBChain
from langchain.document_loaders import GutenbergLoader

print('Python: ', platform.python_version())

os.environ["OPENAI_API_KEY"] = 'your openai api key'
def get_gutenberg(url):
    loader = GutenbergLoader(url)
    data = loader.load()
    return data

romeoandjuliet_data = get_gutenberg('https://www.gutenberg.org/cache/epub/1513/pg1513.txt')

text_splitter = TokenTextSplitter(chunk_size=1000, chunk_overlap=0)
romeoandjuliet_doc = text_splitter.split_documents(romeoandjuliet_data)

embeddings = OpenAIEmbeddings()
vectordb = Chroma.from_documents(romeoandjuliet_doc, embeddings, persist_directory=persist_directory)
vectordb.persist()

romeoandjuliet_qa = ChatVectorDBChain.from_llm(OpenAI(temperature=0, model_name="gpt-3.5-turbo"), vectordb, return_source_documents=True)

query = "Have Romeo and Juliet spent the night together? Provide a verbose answer, referencing passages from the book."
result = romeoandjuliet_qa({"question": query, "chat_history": chat_history})