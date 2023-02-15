import {Router} from 'express'

import passport, { session } from 'passport'

const router = Router()

import { deleteUser, editpassword, edituser, FindUser, signIn,signUp } from '../controllers/user.contoller';
import { AddtoCarpeta, deleteNote, editContent, newNote, showDetails, showNotes, shownotesinaCarpeta } from "../controllers/notas.controller";
import { deleteCarpeta, newCarpeta, showCarpeta } from '../controllers/carpetas.controller';
 
//endpoints para users
router.post('/signup',signUp)
router.post('/signin',signIn)
router.post('/finduser',passport.authenticate('jwt', {session: false}),FindUser)
router.post('/deleteuser',passport.authenticate('jwt', {session: false}),deleteUser)
router.post('/edituser', passport.authenticate('jwt', {session:false}),edituser)
router.post('/editpass',passport.authenticate('jwt', {session:false}),editpassword)

//enpoints para notes
router.post('/newnote',passport.authenticate('jwt', {session: false}),newNote)
router.post('/shownotes',passport.authenticate('jwt', {session: false}),showNotes)  
router.post('/showdetails',passport.authenticate('jwt', {session: false}),showDetails)
router.post('/edit',passport.authenticate('jwt', {session: false}),editContent)
router.post('/delete',passport.authenticate('jwt', {session: false}),deleteNote)
router.post('/addnote',passport.authenticate('jwt', {session: false}),AddtoCarpeta)
router.post('/showcarpet',passport.authenticate('jwt', {session: false}),shownotesinaCarpeta)

//enpoints para carpetas
router.post('/newcarpet',passport.authenticate('jwt', {session: false}),newCarpeta)
router.post('/showCarpeta',passport.authenticate('jwt', {session: false}),showCarpeta)
router.post('/deleteCarpeta',passport.authenticate('jwt', {session: false}),deleteCarpeta)

export default router;