CREATE DATABASE tarefas_db;
USE tarefas_db;
CREATE TABLE tarefas(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
descricao VARCHAR(300) NOT NULL,
responsavel VARCHAR(50) NOT NULL,
data_tarefa DATE NOT NULL,
concluido BOOL)

SELECT * FROM tarefas;

INSERT INTO tarefas(nome, descricao, responsavel, data_tarefa, concluido) VALUES
('Limpar o vaso', 'Ta fedendo a bosta faz 4 dias já', 'Igor Menezes Teruel', CURRENT_DATE, FALSE);