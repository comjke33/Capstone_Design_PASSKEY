
"""

[ slidingwindow 데이터, GPT4 질문-답변 쌍 요청 코드 ]

"""

import google.generativeai as genai

# genai.configure(api_key='')

# Create the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-pro",
  generation_config=generation_config,
  # safety_settings = Adjust safety settings
  # See https://ai.google.dev/gemini-api/docs/safety-settings
)

chat_session = model.start_chat(
  history=[
  ]
)


 # 원본 텍스트 파일 이름
input_source_text = "./shakespeare_translate_line6.txt" 
# 출력 dataset_qa 파일 이름
output_dataset_qa = "./dataset_qa_shakespeare.txt"  

with open(input_source_text, 'r', encoding='utf-8') as file:
    content = file.read().strip()  
    sections = content.split('\n\n')  
    
for idx, section in enumerate(sections):
    source_text = section
    question_msg = "Please provide a question for fact-checking this article and an answer in one sentence. Begin the question with 'Question:' and the answer with 'Answer:'. Offer 3 questions and answers. Avoid questions that simply ask for a fact and can be answered with a 'yes'. Provide the answer as a complete sentence. Do not number the questions and answers."
    prompt = question_msg + "\n\n" + source_text

    print("------------<질문 요청>------------\n" + prompt + "\n")

    response = chat_session.send_message(prompt)

    gpt4_answer = response.text
    print("------------<답변 도착>------------\n")
    print(gpt4_answer)

    filtered_answers = []
    lines = gpt4_answer.split("\n")
    i = 0
    qa_count = 0
    while i < len(lines) - 1 and qa_count < 3:
        question = lines[i].strip()
        answer = lines[i + 1].strip()

        if question.startswith("Question:") and answer.startswith("Answer:") and answer.endswith("."):
            filtered_answers.extend([question, answer, ""])
            i += 2
            qa_count += 1
        else:
            i += 1

    gpt4_answer = "\n".join(filtered_answers).strip()

    print("\n------------<필터링한 답변>------------\n")
    print(gpt4_answer)

    gpt4_answer += "\n\n"

    with open(output_dataset_qa, "a", encoding="utf-8") as file:
        file.write(gpt4_answer)
    print("\n------------<Generate QA data>------------\n\n \n\n")

