// cadastro de esp
const SqlCadastroEsp = `
    INSERT INTO 
        esp( 
            esp_mac
        )   
    VALUE 
        (
            ?
        )
    ;
`
;

// cadastro de usuarios
const SqlCadastroUsuario = `
    INSERT INTO 
        usuarios( 
            usu_nome, 
            usu_nascimento
        ) 
    VALUE 
        ( 
            ?, 
            ?
        );
`
;

// cadastro do relacionamento usuario <> esp
const SqlCadastroUsuarioEsp = `
    INSERT INTO 
        usuariosEsp( 
            usu_id, 
            esp_id
        ) 
    VALUE( 
        ?, 
        ?
    )
    ;
`
;

// Retorna todos os Dados relacionado ao ultimo relacionamento do usuario com um esp
/*
const SqlSelectAllDataUser = `
(
    SELECT 
		dados_id, 
        dados_tipo, 
        dados_valor, 
        DATE_FORMAT(dados_generate,'%d/%m/%Y') AS dados_generate
    FROM 
        dados
    WHERE 
        dados_tipo = 'bpm' 
        AND 
        use_id = ?
    ORDER BY 
        dados_id 
    LIMIT 
        100
    )
    UNION ALL
    (
        SELECT 
            dados_id, 
            dados_tipo, 
            dados_valor, 
            DATE_FORMAT(dados_generate,'%d/%m/%Y') AS dados_generate FROM dados
        WHERE 
            dados_tipo = 'temperatura' 
            AND 
            use_id = ?
        ORDER BY 
            dados_id 
        LIMIT 
            100
    )
    UNION ALL
    (
        SELECT 
            dados_id, 
            dados_tipo, 
            dados_valor, 
            DATE_FORMAT(dados_generate,'%d/%m/%Y') AS dados_generate 
        FROM 
            dados
        WHERE 
            dados_tipo = 'oxigenacao' 
            AND 
            use_id = ?
        ORDER BY 
            dados_id 
        LIMIT 
            100
    )
`
;
*/

const SqlSelectAllDataUser = `
    SELECT 
    -- talvez não precisa trazer por prop
    -- usu_id, 
    -- esu.use_id, 
    -- esp_id, 
    -- use_status,
    -- trazer 100%
    dados_id, 
    dados_tipo, 
    dados_valor, 
    DATE_FORMAT(dados_generate,'%d/%m/%Y %H:%i:%s') AS dados_generate
FROM 
    usuariosEsp esu
INNER JOIN 
    dados dad 
ON 
    esu.use_id = dad.use_id
WHERE 
    -- pega o ultimo relacionamento esp <> usuario
    esu.use_id = ( 
        SELECT 
            MAX(use_id) 
        FROM 
            usuariosEsp t
        WHERE 
            t.usu_id = esu.usu_id
    )
-- fitrar pro id
AND 
    usu_id = ?
ORDER BY 
    dados_generate
;
`;
/*
const SqlSelectAllDataUser = `
    SELECT 
        -- talvez não precisa trazer por prop
        -- usu_id, 
        -- esu.use_id, 
        -- esp_id, 
        -- use_status,
        -- trazer 100%
        dados_id, 
        dados_tipo, 
        dados_valor, 
        dados_generate
    FROM 
        usuariosEsp esu
    INNER JOIN 
        dados dad 
    ON 
        esu.use_id = dad.use_id
    WHERE 
        -- pega o ultimo relacionamento esp <> usuario
        esu.use_id = ( 
            SELECT 
                MAX(use_id) 
            FROM 
                usuariosEsp t
            WHERE 
                t.usu_id = esu.usu_id
        )
    -- fitrar pro id
    AND 
        usu_id = ?
    ORDER BY dados_generate DESC
    ;
`
;
*/

// // select do ultimo dado de temperatura, bpm e oxigenação registrado do usuario
// const SqlLastDataUser = `
//     SELECT 
//         esu.use_id, 
//         esu.usu_id, 
//         esu.esp_id, 
//         usu.usu_nome, 
//         DATE_FORMAT(usu_nascimento,'%d/%m/%Y') AS usu_nascimento ,
//         (
//             -- seleciona o valor do dado 
//             SELECT 
//                 dados_valor 
//             FROM 
//                 dados dad
//             WHERE 
//                 -- o id do ultimo relacionamento do usuario com esp
//                 dad.use_id = d.use_id 
//                 AND 
//                 -- tipo temperatura
//                 dados_tipo = 'temperatura' 
//             -- apenas o ultimo registro com base quando o dado foi gerado
//             ORDER BY dados_id DESC LIMIT 1
//         ) AS temp_valor,
//         (
//             SELECT 
//                 dados_valor 
//             FROM 
//                 dados dad
//             WHERE 
//                 -- o id do ultimo relacionamento do usuario com esp
//                 dad.use_id = d.use_id  
//                 AND 
//                 -- tipo bpm
//                 dados_tipo = 'bpm' 
//             -- apenas o ultimo registro com base quando o dado foi gerado
//             ORDER BY dados_id DESC LIMIT 1 
//         ) AS bpm_valor,
//         (
//             SELECT 
//                 dados_valor 
//             FROM 
//                 dados dad 
//             WHERE 
//                 -- o id do ultimo relacionamento do usuario com esp
//                 dad.use_id = d.use_id  
//                 AND 
//                 -- tipo oxigenacao
//                 dados_tipo = 'oxigenacao' 
//             -- apenas o ultimo registro com base quando o dado foi gerado
//             ORDER BY dados_id DESC LIMIT 1 
//             ) AS oxig_valor
//     FROM 
//         usuariosEsp esu
//     INNER JOIN 
//         usuarios usu 
//     ON 
//         -- pega os dados do usuario
//         usu.usu_id = esu.usu_id 
//     INNER JOIN 
//         dados d 
//     ON 
//         -- pega os dados dos dados
//         d.use_id = esu.use_id 
//     WHERE 
//         -- pega o ultimo relacionamento esp <> usuario
//         esu.use_id = ( 
//             SELECT 
//                 MAX(use_id) 
//             FROM 
//                 usuariosEsp t
//             WHERE 
//                 t.usu_id = esu.usu_id
//         )
//     -- organiza pelos usuarios
//     GROUP BY 
//         usu.usu_id 
//     ;
// `
// ;

/*
const SqlLastDataUser = `
    SELECT 
        esu.use_id, 
        esu.usu_id, 
        esu.esp_id, 
        usu.usu_nome, 
        DATE_FORMAT(usu.usu_nascimento,'%d/%m/%Y') AS usu_nascimento,
        
        temp.dados_valor AS temp_valor,
        bpm.dados_valor AS bpm_valor,
        oxig.dados_valor AS oxig_valor

    FROM
        usuariosEsp esu

    INNER JOIN 
        usuarios usu ON usu.usu_id = esu.usu_id

    -- Pega o último dado de temperatura
    LEFT JOIN (
        SELECT 
            use_id, dados_valor
        FROM 
            dados
        WHERE 
            dados_tipo = 'temperatura'
        ORDER BY 
            dados_id DESC
    ) 
    AS 
        temp 
    ON 
        temp.use_id = esu.use_id

    -- Pega o último dado de bpm
    LEFT JOIN (
        SELECT 
            use_id, dados_valor
        FROM 
            dados
        WHERE 
            dados_tipo = 'bpm'
        ORDER BY 
            dados_id DESC
    ) 
    AS 
        bpm 
    ON 
        bpm.use_id = esu.use_id

    -- Pega o último dado de oxigenação
    LEFT JOIN (
        SELECT 
            use_id, dados_valor
        FROM 
            dados
        WHERE 
            dados_tipo = 'oxigenacao'
        ORDER BY 
            dados_id DESC
    ) 
    AS 
        oxig 
    ON 
        oxig.use_id = esu.use_id

    WHERE 
        esu.use_id = (
            SELECT 
                MAX(use_id) 
            FROM 
                usuariosEsp t
            WHERE 
                t.usu_id = esu.usu_id
        )

    GROUP BY 
        usu.usu_id
    ;
`
;
*/
const SqlLastDataUser = `
SELECT 
    esu.use_id, 
    esu.usu_id, 
    esu.esp_id, 
    usu.usu_nome, 
    DATE_FORMAT(usu.usu_nascimento,'%d/%m/%Y') AS usu_nascimento,
    esp.esp_mac,
    
    temp.dados_valor AS temp_valor,
    bpm.dados_valor AS bpm_valor,
    oxig.dados_valor AS oxig_valor

FROM
    usuariosEsp esu

INNER JOIN 
    usuarios usu ON usu.usu_id = esu.usu_id
INNER JOIN 
	esp ON esp.esp_id = esu.esp_id
-- Último dado de temperatura por use_id
LEFT JOIN (
    SELECT d1.use_id, d1.dados_valor
    FROM dados d1
    INNER JOIN (
        SELECT use_id, MAX(dados_id) AS max_id
        FROM dados
        WHERE dados_tipo = 'temperatura'
        GROUP BY use_id
    ) d2 ON d1.use_id = d2.use_id AND d1.dados_id = d2.max_id
) AS temp ON temp.use_id = esu.use_id

-- Último dado de bpm por use_id
LEFT JOIN (
    SELECT d1.use_id, d1.dados_valor
    FROM dados d1
    INNER JOIN (
        SELECT use_id, MAX(dados_id) AS max_id
        FROM dados
        WHERE dados_tipo = 'bpm'
        GROUP BY use_id
    ) d2 ON d1.use_id = d2.use_id AND d1.dados_id = d2.max_id
) AS bpm ON bpm.use_id = esu.use_id

-- Último dado de oxigenação por use_id
LEFT JOIN (
    SELECT d1.use_id, d1.dados_valor
    FROM dados d1
    INNER JOIN (
        SELECT use_id, MAX(dados_id) AS max_id
        FROM dados
        WHERE dados_tipo = 'oxigenacao'
        GROUP BY use_id
    ) d2 ON d1.use_id = d2.use_id AND d1.dados_id = d2.max_id
) AS oxig ON oxig.use_id = esu.use_id

-- Último relacionamento do usuário com o ESP
WHERE 
    esu.use_id = (
        SELECT MAX(t.use_id)
        FROM usuariosEsp t
        WHERE t.usu_id = esu.usu_id
    )

GROUP BY 
    usu.usu_id;
`

const SqlDadosUsuarios = `
    SELECT 
        usu_nome,
        usu_nascimento
    FROM 
        usuarios
    WHERE 
        usu_id = ?
    ;
`
;

const SqlTodosUsuarios = `
    SELECT 
        usu_id, 
        usu_nome 
    FROM 
        usuarios
    ;
`
;

const SqlTodosEsps = `
    SELECT
        esp_id,
        esp_mac
    FROM
        esp
    ;
`
;

const SqlStatusUpdateUsuariosEsp = `
UPDATE 
    usuariosEsp
SET 
    use_status = 1
WHERE 
    esp_id = ?
`
;

const SqlEspJaCadastrado = `
    SELECT 
        * 
    FROM 
        esp 
    WHERE 
        esp_mac = ?
    LIMIT 
        1    
    ;
`
;


// Exporta todas os Query
module.exports = { SqlCadastroEsp, SqlCadastroUsuario, SqlCadastroUsuarioEsp, SqlSelectAllDataUser, SqlLastDataUser, SqlDadosUsuarios, SqlTodosUsuarios, SqlTodosEsps, SqlStatusUpdateUsuariosEsp, SqlEspJaCadastrado, };