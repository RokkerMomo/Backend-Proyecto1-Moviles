import {Router} from 'express'

const router = Router()

import { deleteUser, FindUser, signIn,signUp } from '../controllers/user.contoller';
import { AddtoColecction, deleteNote, editContent, newNote, showDetails, showNotes, shownotesinacollection } from "../controllers/notas.controller";
import { newCarpeta, showcolecction } from '../controllers/carpetas.controller';

//endpoints para users
router.post('/signup',signUp)
router.post('/signin',signIn)
router.post('/finduser',FindUser)
router.post('/deleteuser',deleteUser)

//enpoints para notes
router.post('/newnote',newNote)
router.post('/shownotes',showNotes)
router.post('/showdetails',showDetails)
router.post('/edit',editContent)
router.post('/delete',deleteNote)
router.post('/addnote',AddtoColecction)
router.post('/showcarpet',shownotesinacollection)

//enpoints para carpetas
router.post('/newcarpet',newCarpeta)
router.post('/showcolecction',showcolecction)




 
export default router;