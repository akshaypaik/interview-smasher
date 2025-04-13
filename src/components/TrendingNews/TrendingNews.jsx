import axios from 'axios'
import React from 'react'
import { NEWS_API_LATEST } from '../../utils/constants/apiConstants'
import { NEWS_API_KEY } from '../../utils/constants/apiKeyConstants'
import { useQuery } from '@tanstack/react-query'
import TrendingNewsCard from './TrendingNewsCard'
import { useSelector } from 'react-redux'
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner'

// const data = [
//     {
//         "article_id": "eb2cd651d37d3ee1a46b241de14c750d",
//         "title": "Who Owns ATS Diesel & Where Is The Company's Headquarters Located?",
//         "link": "https://www.slashgear.com/1827447/ats-diesel-who-owns-company-where-located-about/",
//         "keywords": [
//             "cars"
//         ],
//         "creator": [
//             "staff@slashgear.com (Patrick Phillips)"
//         ],
//         "description": "ATS Diesel is one of the go-to brands for transmission repairs and diesel performance, and the company has a remarkably American presence.",
//         "content": "ONLY AVAILABLE IN PAID PLANS",
//         "pubDate": "2025-04-12 21:45:00",
//         "pubDateTZ": "UTC",
//         "image_url": "https://www.slashgear.com/img/gallery/who-owns-ats-diesel-where-is-the-companys-headquarters-located/l-intro-1743702622.jpg",
//         "video_url": null,
//         "source_id": "slashgear",
//         "source_name": "Slashgear",
//         "source_priority": 10233,
//         "source_url": "https://www.slashgear.com",
//         "source_icon": "https://i.bytvi.com/domain_icons/slashgear.png",
//         "language": "english",
//         "country": [
//             "singapore",
//             "united states of america",
//             "united kingdom"
//         ],
//         "category": [
//             "technology"
//         ],
//         "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
//         "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
//         "duplicate": false
//     },
//     {
//         "article_id": "7b2f21cf34ae74d73bb8eba7ca4161de",
//         "title": "15 Charming Small Towns in Canada You’ll Fall in Love With - MSN",
//         "link": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxOM2ROSi1WakFMNElTZkV1YTdCSGVHVm5taGdYZDUxNG1uRXdlZnR6dTFZMENEUWE3MWgyVG02Wm42RkcyR1NHckVTdy1wVzRXQWVQT092bTE4WklEWE1FTVJGbXFDYmsxM29DWGJBUjZyb29qZlhjZkVrYzk1cWdFdlNQbEl5eDBjUXR6b0dNbDU4M3BOb2lGN3lhRkoya0VIbXE0YUpJWUEwcVk?oc=5",
//         "keywords": null,
//         "creator": null,
//         "description": "15 Charming Small Towns in Canada You’ll Fall in Love With MSN",
//         "content": "ONLY AVAILABLE IN PAID PLANS",
//         "pubDate": "2025-04-12 21:42:14",
//         "pubDateTZ": "UTC",
//         "image_url": null,
//         "video_url": null,
//         "source_id": "google",
//         "source_name": "Google News",
//         "source_priority": 14,
//         "source_url": "https://news.google.com",
//         "source_icon": "https://i.bytvi.com/domain_icons/google.png",
//         "language": "english",
//         "country": [
//             "canada"
//         ],
//         "category": [
//             "technology"
//         ],
//         "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
//         "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
//         "duplicate": false
//     },
//     {
//         "article_id": "e4ded4115aef2c56a1adb0a85045fc12",
//         "title": "Samsungにしては超大型アプデ。Galaxy Z Fold 7の一部スペック判明? - xPeria lEaker",
//         "link": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxNYkFGTGd1Z3NPNndEX0YwMmxqVXFFUGstc0xOWnNwOTU0dXh2OTZoQzI1ZmhaazdEaGF4TnFob2Rkb1hNY0czNEtTUWVqZC1SUTRhLVFvWW12ZjFoQk5DT09SaFJFUFNpMXRQSS0tSnFZaGVLbGEzbE9iS0RXMlh3SVFOUjNWR0w4Tlp5STJsb2dnZXpoUlFqNGFpUWdKT0lEeTdoVU5hWFk?oc=5",
//         "keywords": null,
//         "creator": null,
//         "description": "Samsungにしては超大型アプデ。Galaxy Z Fold 7の一部スペック判明? xPeria lEakerお手ごろ縦折りスマホ「Galaxy Z Flip FE」、カメラは2年前のFlip5と同じ?(GetNavi web) dメニューニュースGalaxy Z Flip7/Z Flip7 FEにExynos 2500が搭載? - iPhone Mania iPhone Mania",
//         "content": "ONLY AVAILABLE IN PAID PLANS",
//         "pubDate": "2025-04-12 21:33:43",
//         "pubDateTZ": "UTC",
//         "image_url": null,
//         "video_url": null,
//         "source_id": "google",
//         "source_name": "Google News",
//         "source_priority": 14,
//         "source_url": "https://news.google.com",
//         "source_icon": "https://i.bytvi.com/domain_icons/google.png",
//         "language": "japanese",
//         "country": [
//             "japan"
//         ],
//         "category": [
//             "technology",
//             "science"
//         ],
//         "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
//         "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
//         "duplicate": false
//     },
//     {
//         "article_id": "dd76b0fe55cbf4b4490daa32c87c519c",
//         "title": "Min Woo Lee penalized for causing his ball to move on 13th hole at the Masters",
//         "link": "https://www.dailyrecordnews.com/ap_news/sports/min-woo-lee-penalized-for-causing-his-ball-to-move-on-13th-hole-at-the/article_c3f297d9-0384-531c-bb51-bb90c7c6a7d4.html",
//         "keywords": null,
//         "creator": [
//             "AP"
//         ],
//         "description": "AUGUSTA, Ga. (AP) — Min Woo Lee was penalized one stroke after his third round in the Masters on Saturday after tournament officials determined he caused his ball to move on the 13th fairway.",
//         "content": "ONLY AVAILABLE IN PAID PLANS",
//         "pubDate": "2025-04-12 21:32:24",
//         "pubDateTZ": "UTC",
//         "image_url": "https://bloximages.chicago2.vip.townnews.com/dailyrecordnews.com/content/tncms/assets/v3/editorial/6/12/61212595-bb38-5845-b185-5ef6a7cc8e11/67faa4b7b2e6e.image.jpg?resize=300%2C200",
//         "video_url": null,
//         "source_id": "dailyrecordnews",
//         "source_name": "Dailyrecordnews",
//         "source_priority": 113511,
//         "source_url": "https://www.dailyrecordnews.com",
//         "source_icon": "https://i.bytvi.com/domain_icons/dailyrecordnews.jpg",
//         "language": "english",
//         "country": [
//             "united states of america"
//         ],
//         "category": [
//             "technology"
//         ],
//         "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
//         "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
//         "duplicate": true
//     },
//     {
//         "article_id": "5d277b9a05dc88aa82c23ccb8a7e776f",
//         "title": "¿Luna llena más pequeña? Llega la «microluna» este 15 de abril",
//         "link": "https://www.elpais.cr/2025/04/12/luna-llena-mas-pequena-llega-la-microluna-este-15-de-abril/",
//         "keywords": [
//             "ciencia y tecnología",
//             "luna llena",
//             "abril",
//             "disminución",
//             "microluna",
//             "luna"
//         ],
//         "creator": [
//             "Carlos Salazar"
//         ],
//         "description": "Madrid 12 Abr. (EUROPA PRESS) – Este 15 de abril se podrá observar en el cielo una microluna llena, que se produce cuando la luna nueva, o llena en este caso, coincide con el apogeo, el punto de la órbita lunar más alejado de la Tierra. Esta luna llena se podrá ver algo más pequeña [...]",
//         "content": "ONLY AVAILABLE IN PAID PLANS",
//         "pubDate": "2025-04-12 21:30:19",
//         "pubDateTZ": "UTC",
//         "image_url": "https://www.elpais.cr/wp-content/uploads/2024/04/La-Luna.jpg",
//         "video_url": null,
//         "source_id": "elpaiscr",
//         "source_name": "Elpais",
//         "source_priority": 785271,
//         "source_url": "https://www.elpais.cr",
//         "source_icon": "https://i.bytvi.com/domain_icons/elpaiscr.png",
//         "language": "spanish",
//         "country": [
//             "costa rica"
//         ],
//         "category": [
//             "technology",
//             "science"
//         ],
//         "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
//         "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
//         "duplicate": false
//     },
//     {
//         "article_id": "b78f3b131dd46e193dcfde93fc99ec2e",
//         "title": "“No lo quiero en mi película”: Vin Diesel exigió que Jean-Claude Van Damme no apareciera en Rápidos y Furiosos",
//         "link": "https://www.xataka.com.mx/cine-y-tv/no-quiero-mi-pelicula-vin-diesel-exigio-que-jean-claude-van-damme-no-apareciera-rapidos-furiosos",
//         "keywords": null,
//         "creator": [
//             "Ismael Garcia Delgado"
//         ],
//         "description": "No cabe duda que Vin Diesel es la estrella por excelencia de Rápido y Furioso. A lo largo de poco más de veinte años, hemos visto al actor en el papel de Toretto, lo que evidencia su clara influencia y poder sobre la saga. Al fungir no solo como protagonista, sino también como productor, es claro que su palabra tiene peso en las decisiones creativas.Si recordamos, tras su disputa con Dwayne Johnson, la estrella de Black Adam se vio relegada del elenco posterior a la octava entrega. Sin embargo, \"The Rock\" no es la única estrella que ha quedado fuera de la franquicia por decisión de Diesel, para ejemplo de ello se encuentra el enigmático artista marcial Jean-Claude Van Damme. {\"videoId\":\"x9crq6q\",\"autoplay\":true,\"title\":\"Aspiradora robot con brazo\", \"tag\":\"\", \"duration\":\"39\"} Fue durante una entrevista para The Telegraph, que el actor de Contacto Sangriento reveló que se le contactó para formar parte de la franquicia pero el propio Vin Diesel fue el encargado de que esto no sucediera. Si bien el belga no especificó en qué entrega lo hubiéramos podido ver y mucho menos en algún posible papel, aseguró que hubiera sido un \"casting de lujo\".\"Me querían en Rápidos y Furiosos, pero Vin Diesel dijo 'No, no lo quiero en mi película'\". Aunque nunca lo podremos ver detrás de un volante a toda velocidad con el resto de \"la familia\", persiste una pequeña luz de esperanza para los fanáticos de las películas de acción. Según reveló el actor, Sylvester Stallone le prometió reaparecer en la franquicia Los Indestructibles como el hermano gemelo de Vilain, el villano de la segunda entrega. Tal vez en referencia a Doble Impacto.Si bien tal aparición ahora se ve un poco más lejos tras el fracaso de Los Indestructibles 4, el actor mantiene la ilusión. Además, hizo una pequeña reflexión sobre cómo, en una época dominada por los efectos especiales hechos por computadora, al menos las cintas de acción se mantienen un poco más intactas ante la tendencia por el CGI.\"La gente ha estado conduciendo un Tesla en la pantalla. Hermoso y perfecto CGI. Y tal vez algunas personas quieran volver a la palanca de cambios por un tiempo. Algunas personas. ¿Sabes lo que estoy diciendo como una metáfora? Yo soy una palanca de cambios\". En Xataka México 3.5 horas de ciencia ficción en dos filmes: la primera película es una de las mejores en la historia del género y la segunda salió terriblemente mal Ahora bien, que si nos lo ponemos a pensar, hubiese sido un buen fichaje, al fin y al cabo la saga se caracteriza por añadir actores musculosos e imponentes con cada entrega. Podemos mencionar a Jason Statham, John Cena, Jason Momoa y Alan Ritchson, por ejemplo.Si por tu parte gustas disfrutar de Rápido y Furioso, puedes encontrar la saga completa a través de Amazon Prime Video. (function() { window._JS_MODULES = window._JS_MODULES || {}; var headElement = document.getElementsByTagName('head')[0]; if (_JS_MODULES.instagram) { var instagramScript = document.createElement('script'); instagramScript.src = 'https://platform.instagram.com/en_US/embeds.js'; instagramScript.async = true; instagramScript.defer = true; headElement.appendChild(instagramScript); } })(); - La noticia “No lo quiero en mi película”: Vin Diesel exigió que Jean-Claude Van Damme no apareciera en Rápidos y Furiosos fue publicada originalmente en Xataka México por Ismael Garcia Delgado .",
//         "content": "ONLY AVAILABLE IN PAID PLANS",
//         "pubDate": "2025-04-12 21:30:15",
//         "pubDateTZ": "UTC",
//         "image_url": "https://i.blogs.es/836d83/captura-de-pantalla-2025-04-08-191049_waifu2x_photo_noise1_scale/1024_2000.png",
//         "video_url": null,
//         "source_id": "xataka",
//         "source_name": "Xataka Mexico",
//         "source_priority": 76603,
//         "source_url": "https://www.xataka.com.mx",
//         "source_icon": "https://i.bytvi.com/domain_icons/xataka.png",
//         "language": "spanish",
//         "country": [
//             "mexico"
//         ],
//         "category": [
//             "technology"
//         ],
//         "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
//         "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
//         "duplicate": false
//     },
//     {
//         "article_id": "f7e54e59a8f288a5f80e5eae1b054ad9",
//         "title": "4 Best New Meme Coins to Join in 2025 – Don’t Miss Out on Fwog, Tutorial and This Exclusive Whitelist",
//         "link": "https://www.analyticsinsight.net/cryptocurrency-analytics-insight/4-best-new-meme-coins-to-join-in-2025-dont-miss-out-on-fwog-tutorial-and-this-exclusive-whitelist",
//         "keywords": [
//             "fwog crypto",
//             "meme coins 2025",
//             "troller cat presale",
//             "best meme coins to buy",
//             "$tcat token"
//         ],
//         "creator": null,
//         "description": null,
//         "content": "ONLY AVAILABLE IN PAID PLANS",
//         "pubDate": "2025-04-12 21:30:00",
//         "pubDateTZ": "UTC",
//         "image_url": "https://media.assettype.com/analyticsinsight%2F2025-04-12%2F285uwv92%2FPicture338.png?ar=40%3A21&auto=format%2Ccompress&enlarge=true&mode=crop&ogImage=true&overlay=false&overlay_position=bottom&overlay_width=100&w=1200",
//         "video_url": null,
//         "source_id": "analyticsinsight",
//         "source_name": "Analytics And Insight",
//         "source_priority": 24556,
//         "source_url": "https://www.analyticsinsight.net",
//         "source_icon": "https://i.bytvi.com/domain_icons/analyticsinsight.png",
//         "language": "english",
//         "country": [
//             "united states of america"
//         ],
//         "category": [
//             "technology",
//             "business"
//         ],
//         "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
//         "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
//         "duplicate": false
//     },
//     {
//         "article_id": "b6e9bab03828d228263f800b82872aa3",
//         "title": "Anthony Santander homers in his return to Camden Yards, his first HR for the Blue Jays",
//         "link": "https://www.dailyrecordnews.com/ap_news/sports/anthony-santander-homers-in-his-return-to-camden-yards-his-first-hr-for-the-blue/article_a15f5ca2-6054-5b27-b4d5-b36074ffabff.html",
//         "keywords": null,
//         "creator": [
//             "By NOAH TRISTER - AP Baseball Writer"
//         ],
//         "description": "BALTIMORE (AP) — Anthony Santander finally homered for the Toronto Blue Jays.",
//         "content": "ONLY AVAILABLE IN PAID PLANS",
//         "pubDate": "2025-04-12 21:26:15",
//         "pubDateTZ": "UTC",
//         "image_url": "https://bloximages.chicago2.vip.townnews.com/dailyrecordnews.com/content/tncms/assets/v3/editorial/0/a0/0a0ebf12-bc19-5b74-8858-aef31fb94655/67fae0f18743a.image.jpg?resize=300%2C200",
//         "video_url": null,
//         "source_id": "dailyrecordnews",
//         "source_name": "Dailyrecordnews",
//         "source_priority": 113511,
//         "source_url": "https://www.dailyrecordnews.com",
//         "source_icon": "https://i.bytvi.com/domain_icons/dailyrecordnews.jpg",
//         "language": "english",
//         "country": [
//             "united states of america"
//         ],
//         "category": [
//             "technology"
//         ],
//         "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
//         "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
//         "duplicate": true
//     },
//     {
//         "article_id": "09ad873c2e7a734ccfbcf4367514dc3e",
//         "title": "Actualité : Bon plan – La cafetière Philips L'OR Barista Sublime \"5 étoiles\" à 54,99 € (-13%)",
//         "link": "https://www.lesnumeriques.com/cafetiere-capsule/bon-plan-la-cafetiere-philips-l-or-barista-sublime-5-etoiles-a-54-99-13-n235525.html",
//         "keywords": null,
//         "creator": [
//             "Rick"
//         ],
//         "description": "La cafetière Philips L'OR Barista Sublime passe sous les 60 € chez Amazon soit une baisse d'environ 13% sur le prix habituellement constaté.",
//         "content": "ONLY AVAILABLE IN PAID PLANS",
//         "pubDate": "2025-04-12 21:25:02",
//         "pubDateTZ": "UTC",
//         "image_url": "https://cdn.lesnumeriques.com/optim/test/17/171849/33aa0baa-philips-l-or-barista-sublime-des-ameliorations-dans-la-continuite__800_800__639-0-2907-2268.jpeg",
//         "video_url": null,
//         "source_id": "lesnumeriques",
//         "source_name": "Les Numeriques",
//         "source_priority": 7538,
//         "source_url": "https://www.lesnumeriques.com",
//         "source_icon": "https://i.bytvi.com/domain_icons/lesnumeriques.png",
//         "language": "french",
//         "country": [
//             "france"
//         ],
//         "category": [
//             "technology"
//         ],
//         "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
//         "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
//         "duplicate": false
//     },
//     {
//         "article_id": "a5e0dcef93e9790cdb6f8a9dd60da8b3",
//         "title": "How to Avoid Microsoft Blocking Teams on Desktop",
//         "link": "https://www.maketecheasier.com/avoid-microsoft-blocking-teams-on-desktop/",
//         "keywords": [
//             "windows",
//             "microsoft teams",
//             "microsoft"
//         ],
//         "creator": null,
//         "description": "Are you getting warnings about Microsoft blocking Teams? Learn why it's happening and how to ensure you maintain access.",
//         "content": "ONLY AVAILABLE IN PAID PLANS",
//         "pubDate": "2025-04-12 21:25:00",
//         "pubDateTZ": "UTC",
//         "image_url": "https://www.maketecheasier.com/assets/uploads/2025/04/how-to-avoid-microsoft-blocking-teams-on-desktop-featured.jpg",
//         "video_url": null,
//         "source_id": "maketecheasier",
//         "source_name": "Maketecheasier",
//         "source_priority": 8914,
//         "source_url": "https://www.maketecheasier.com",
//         "source_icon": "https://i.bytvi.com/domain_icons/maketecheasier.png",
//         "language": "english",
//         "country": [
//             "singapore"
//         ],
//         "category": [
//             "technology"
//         ],
//         "sentiment": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "sentiment_stats": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "ai_tag": "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
//         "ai_region": "ONLY AVAILABLE IN CORPORATE PLANS",
//         "ai_org": "ONLY AVAILABLE IN CORPORATE PLANS",
//         "duplicate": false
//     }
// ]

const TrendingNews = () => {

    const userInfo = useSelector((store) => store.app.userInfo);
    const category = "technology";
    const country = "in";
    const language = "en";

    const fetchLatestNews = async () => {
        if (!userInfo?.email) {
            return;
        }
        const { data } = await axios.get(`${NEWS_API_LATEST}${NEWS_API_KEY}
            &category=${category}&country=${country}&language=${language}`);
        return data.results;
    }

    const { data, isLoading } = useQuery({
        queryKey: ["trendingLatestNews"],
        queryFn: fetchLatestNews
    });

    return (
        <div className='m-8 w-full h-full'>
            {userInfo?.email && <>
                <h1 className='text-2xl font-bold'>Trending News</h1>
                <div>
                    {data?.map((news) => <TrendingNewsCard key={news.article_id} info={news} />)}
                </div>
            </>}
            {isLoading && <LoadingSpinner />}
            {!userInfo?.email && <div className='text-2xl font-bold flex items-center justify-center'>Please login to see all trending news from tech!</div>}
        </div>
    )
}

export default TrendingNews