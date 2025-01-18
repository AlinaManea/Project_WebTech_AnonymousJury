import express from 'express';
import {
    getLivrabile,
    getLivrabilById,
    createLivrabil,
    updateLivrabil,
    deleteLivrabil
} from '../dataAccess/LivrabilDA.js';

let livrabilRouter = express.Router();

// GET: Obține toate livrabilele
livrabilRouter.route('/livrabil').get(async (req, res) => {
    try {
        const livrabile = await getLivrabile();
        res.status(200).json(livrabile);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// GET: Obține un livrabil după ID
livrabilRouter.route('/livrabil/:id').get(async (req, res) => {
    try {
        const livrabil = await getLivrabilById(req.params.id);
        if (livrabil) {
            res.status(200).json(livrabil);
        } else {
            res.status(404).json({ message: 'Livrabil not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// POST: Crează un livrabil nou
livrabilRouter.route('/livrabil').post(async (req, res) => {
    try {
        const newLivrabil = await createLivrabil(req.body);
        res.status(201).json(newLivrabil);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// PUT: Actualizează un livrabil existent după ID
livrabilRouter.route('/livrabil/:id').put(async (req, res) => {
    try {
        const updatedLivrabil = await updateLivrabil(req.body, req.params.id);
        if (updatedLivrabil.error) {
            res.status(400).json(updatedLivrabil.msg);
        } else {
            res.status(200).json(updatedLivrabil.obj);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// DELETE: Șterge un livrabil după ID
livrabilRouter.route('/livrabil/:id').delete(async (req, res) => {
    try {
        const deletedLivrabil = await deleteLivrabil(req.params.id);
        if (deletedLivrabil.error) {
            res.status(400).json(deletedLivrabil.msg);
        } else {
            res.status(200).json(deletedLivrabil.obj);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

export default livrabilRouter;
