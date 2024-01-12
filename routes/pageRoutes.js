import express from 'express'
import { getPage, uploadPage, updatePage, deletePage } from '../webData/pageInfo.js';
import { getArticles, getArticleById, uploadArticle, deleteArticle, uploadComment, updateArticle, deleteComment } from '../webData/article.js'
import { getConfig, updateConfig, uploadConfig } from '../webData/config.js';

const router = express.Router();

//get
router.get('/getArticles/:number?', getArticles)
router.get('/getArticleById/:id', getArticleById)
router.get('/getPage/:pageName', getPage) //get page with global config
router.get('/getConfig', getConfig)

//post
router.post('/uploadPage', uploadPage)
router.post('/uploadArticle', uploadArticle)
router.post('/uploadComment', uploadComment)
router.post('/uploadConfig', uploadConfig)

router.post('/updateConfig/:configType', updateConfig)
router.post('/updatePage/:pageName', updatePage)
router.post('/updateArticle/:id', updateArticle)

//delete
router.delete('/deleteArticle/:id', deleteArticle)
router.delete('/deletePage/:pageName', deletePage)
router.delete('/deleteComment/:articleId/:commentId', deleteComment)

export default router