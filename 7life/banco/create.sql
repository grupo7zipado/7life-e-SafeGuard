
CREATE TABLE esp(
	esp_id INT PRIMARY KEY AUTO_INCREMENT,
	esp_mac VARCHAR(17) NOT NULL,
	esp_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE usuarios(
	usu_id INT PRIMARY KEY   AUTO_INCREMENT,
    usu_nome VARCHAR(128),
    usu_nascimento DATE NOT NULL,
	usu_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE usuariosEsp(
	use_id INT PRIMARY KEY AUTO_INCREMENT,
    esp_id INT NOT NULL,
    usu_id INT NOT NULL,
    use_status BIT NOT NULL DEFAULT 0,
    use_lastStatus TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    use_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (esp_id) REFERENCES esp(esp_id),
	FOREIGN KEY (usu_id) REFERENCES usuarios(usu_id) 
);
CREATE TABLE dados(
    dados_id INT PRIMARY KEY AUTO_INCREMENT ,
    use_id INT NOT NULL,
    dados_tipo ENUM("temperatura", "oxigenacao", "bpm") NOT NULL,
    dados_valor VARCHAR(32) NOT NULL,
    dados_generate TIMESTAMP NOT NULL,
    dados_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (use_id) REFERENCES usuariosEsp(use_id)
);
