import ImageCardRepository from '../data/repositories/ImageCard.repository.js';
import ImageCardBO from '../domain/ImageCard.js';
import CardBO from '../domain/Card.js';

const imageCardRepository = new ImageCardRepository();

export default class ImageCardController {
    async createImageCard(req, res, next) {
        try {
            const {
                image,
                card
            } = req.body;

            const imageCard = new ImageCardBO(
                undefined,
                image,
                new CardBO (
                    card,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined
                )
            );

            let result = await imageCardRepository.create(imageCard);

            res.status(200).send({
                message: "Image card creataed successfully",
                result: result
            });
        } catch (err) {
            next(err)
        }
    };

    async updateImageCard(req, res, next){
        try {
            const {
                image,
                card
            } = req.body;
    
            const {id} = req.params;
    
            const imageCard = new ImageCardBO(
                    id,
                    image,
                    new CardBO (
                        card,
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        undefined
                    )
                );

            let result = await imageCardRepository.update(imageCard);
    
            res.status(200).send({
                message: "Image card updated successfully",
                result: result
            });
        } catch (err) {
            next(err)
        }   
    };

    async deleteImageCard(req, res, next){
        try {
            const {id} = req.params;

            let result = await imageCardRepository.delete(id);

            res.status(200).send({
                message: "Image card deleted successfully"
            });
        } catch (err) {
            next(err)
        }
    }

    async getAllImagesCards(req, res, next){
        try {
            let result = await imageCardRepository.findAll();

            res.status(200).send({
                message: "Images cards fetched successfully", 
                result: result
            });
        } catch (err) {
            next(err)
        }
    }

    async findOneImageCard(req, res, next){
        try {
            const {id} = req.params;

            let result = await imageCardRepository.findOne(id);

            res.status(200).send({
                message: "Image card fetched successfully",
                result: result
            });
        } catch (err) {
            next(err)
        }
    }
}