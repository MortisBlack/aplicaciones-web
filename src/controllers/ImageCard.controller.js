import ImageCardRepository from '../data/repositories/ImageCard.repository.js';
import ImageCardBO from '../domain/ImageCard.js';
import CardBO from '../domain/Card.js';

const imageCardRepository = new ImageCardRepository();

export default class ImageCardController {
    async createImageCard(req, res, next) {
        try {
            const {
                title,
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
            
            if(result) {
                res.status(200).send({
                    message: "Image card creataed successfully",
                    result: result
                });
            } else {
                res.status(404).send({
                    message: `The card ${card} doesn't exist`
                });
            }
        } catch (err) {
            res.send({
                message: err.message
            })
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
    
            if(result == "card") {
                res.status(404).send({
                    message: `The card ${board} doesn't exist`
                });
            } else if (result == "imageCard") {
                res.status(404).send({
                    message: `The image card ${id} doesn't exist`
                });
            } else {
                res.status(200).send({
                    message: "Image card updated successfully",
                    result: result
                });
            }
        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }   
    };

    async deleteImageCard(req, res, next){
        try {
            const {id} = req.params;

            let result = await imageCardRepository.delete(id);

            if(result) {
                res.status(200).send({
                    message: "Image card deleted successfully"
                });
            } else {
                res.status(404).send({
                    message: `The image card ${id} doesn't exist`
                });
            }
        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }
    }

    async getAllImagesCards(req, res, next){
        try {
            let result = await imageCardRepository.findAll();

            if(result) {
                res.status(200).send({
                    message: "Images cards fetched successfully", 
                    result: result
                });
            } else {
                res.status(404).send({
                    message: `There are not images cards registered yet`
                });
            }
        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }
    }

    async findOneImageCard(req, res, next){
        try {
            const {id} = req.params;

            let result = await imageCardRepository.findOne(id);


            if(result) {
                res.status(200).send({
                    message: "Image card fetched successfully",
                    result: result
                });
            } else {
                res.status(404).send({
                    message: `The image card ${id} doesn't exist`
                });
            }

        } catch (err) {
            res.send({
                message: err.message
            })
            next(err)
        }
    }
}