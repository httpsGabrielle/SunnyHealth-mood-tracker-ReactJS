import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"

import { Box, Container, Grid, TextField, Typography } from "@mui/material"
import secureLocalStorage from "react-secure-storage"
import api from "../../services/api"

// ----------------------------------------------------------------


export default function Settings(){

    const navigate = useNavigate()

    const [email, setEmail] = useState()

    const [password, setPassword] = useState()

    const [password02, setPassword02] = useState()

    useEffect(()=>{
        getUserDetails()
    }, [])

    function getUserDetails(){
        api.get(`/usuario/${secureLocalStorage.getItem('secret')}`)
        .then(
            response => {
                setEmail(response.data.email)
            }
        )
    }
    return (
        <>

            <Container>
                <Typography variant="h1">Termos e Condições</Typography>
                <Typography variant="h2">Política Privacidade</Typography>
                <h2>A sua privacidade é importante para nós</h2>
                <p>
                    É política do SunnyHealth respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site SunnyHealth, e outros sites que possuímos e operamos. Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
                </p>

                <p>
                    Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
                </p>

                <p>
                    Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei. O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
                </p>

                <p>
                    Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados. O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato conosco.
                </p>

                <h2>Compromisso do Usuário</h2>
                <p>
                    O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o SunnyHealth oferece no site e com caráter enunciativo, mas não limitativo:
                </p>

                <p>
                    A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé e à ordem pública;
                </p>

                <p>
                    B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, de apostas nacionais ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;
                </p>

                <p>
                    C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do SunnyHealth, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.
                </p>

                <h2>Mais informações</h2>
                <p>
                Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo
                que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies
                aƟvados, caso interaja com um dos recursos que você usa em nosso site.</p>

                <p>Esta política é efetiva a partir de 5 Dezembro 2023 12:34</p>

                <h1>Termos e Condições</h1>

                <p><strong>1. Termos</strong></p>
                <p>Ao acessar ao site SunnyHealth, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis...</p>

                <p><strong>2. Uso de Licença</strong></p>
                <p>É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site SunnyHealth...</p>

                <p><strong>3. Isenção de responsabilidade</strong></p>
                <p>Os materiais no site da SunnyHealth são fornecidos 'como estão'. SunnyHealth não oferece garantias, expressas ou implícitas...</p>

                <p><strong>4. Limitações</strong></p>
                <p>Em nenhum caso o SunnyHealth ou seus fornecedores serão responsáveis por quaisquer danos...</p>

                <p><strong>5. Precisão dos materiais</strong></p>
                <p>Os materiais exibidos no site da SunnyHealth podem incluir erros técnicos, tipográficos ou fotográficos...</p>

                <p><strong>6. Links</strong></p>
                <p>O SunnyHealth não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado...</p>

                <p><strong>Modificações</strong></p>
                <p>O SunnyHealth pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio...</p>

                <p><strong>Lei aplicável</strong></p>
                <p>Estes termos e condições são regidos e interpretados de acordo com as leis do SunnyHealth e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade...</p>

            </Container>

        </>
    )
}