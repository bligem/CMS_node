import express from 'express'
import { getPage } from '../webData/pageInfo.js';
import { getArticles, uploadArticle, deleteArticle, uploadComment } from '../webData/article.js'

const router = express.Router();

//TODO usuwanie artykułów
router.get('/getArticles/:number?', getArticles)//MANDATORY - bez :number - wyświetla wszystkie
router.get('/getPage/:pageName', getPage) //get page with global config

router.delete('/deleteArticle/:articleId', deleteArticle);

router.post('/uploadArticle', uploadArticle);
router.post('/uploadComment', uploadComment)//todo MANDATORY
// router.post('/changeGlobalConfig/:config', pageMethods.changeConfig)//todo
// router.post('/changePage/:page', pageMethods.changePage)//todo

export default router