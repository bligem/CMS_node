import express from 'express'
import Page from '../WebController/pageInfo.js';
import Article from '../WebController/article.js'
import Config from '../WebController/config.js';

const router = express.Router();

//get
router.get('/getArticles/:number?', Article.getArticles)
router.get('/getArticleById/:id', Article.getArticleById)
router.get('/getPage/:pageName', Page.getPage) //get page with global config
router.get('/getPages', Page.getPages)
router.get('/getConfig/:configId', Config.getConfig)

//post
router.post('/uploadPage', Page.uploadPage)
router.post('/uploadArticle', Article.uploadArticle)
router.post('/uploadComment', Article.uploadComment)
router.post('/uploadConfig', Config.uploadConfig)

router.post('/updateConfig/:configType', Config.updateConfig)
router.post('/updatePage/:pageName', Page.updatePage)
router.post('/updateArticle/:id', Article.updateArticle)

//delete
router.delete('/deleteArticle/:id', Article.deleteArticle)
router.delete('/deletePage/:pageName', Page.deletePage)
router.delete('/deleteComment/:articleId/:commentId', Article.deleteComment)

export default router
