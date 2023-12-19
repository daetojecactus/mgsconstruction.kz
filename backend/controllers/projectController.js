const uuid = require("uuid");
const path = require("path");
const {
  Project,
  ProjectInfo,
  Card,
  CardImage,
  ProjectCategory,
  SocialLink,
} = require("../models/models");
const ApiError = require("../error/ApiError");

class ProjectController {
  //основной
  async createProject(req, res, next) {
    console.log("req", req.body);
    try {
      const { info, ...projectData } = req.body;
      const { cards } = projectData;
      const { img, pageImg } = req.files; // Добавляем pageImg
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      let pageImgFileName = uuid.v4() + ".jpg"; // Генерируем имя для pageImg
      pageImg.mv(path.resolve(__dirname, "..", "static", pageImgFileName)); // Сохраняем pageImg

      // Извлекаем name, stage и descr из projectData
      const { name, stage, descr, projectCategoryId } = projectData;

      // Создаем проект, включая name, stage, descr, img и pageImg
      const project = await Project.create({
        name,
        stage,
        descr,
        projectCategoryId, //NOVOE
        img: fileName,
        pageImg: pageImgFileName, // Добавляем поле pageImg
      });

      let infoData;
      if (info) {
        try {
          infoData = JSON.parse(info);
        } catch (err) {
          return next(ApiError.badRequest("Ошибка при разборе JSON в 'info'"));
        }
        infoData.forEach((i) =>
          ProjectInfo.create({
            title: i.title,
            description: i.description,
            projectId: project.id,
          })
        );
      }

      if (cards) {
        const cardsData = JSON.parse(cards);
        for (const cardData of cardsData) {
          const card = await Card.create({
            title: cardData.title,
            projectId: project.id,
          });

          const cardImageUrls = []; // Создайте массив для путей к изображениям

          for (const imgData of cardData.images) {
            const cardFileName = uuid.v4() + ".jpg";
            imgData.mv(path.resolve(__dirname, "..", "static", cardFileName));
            cardImageUrls.push(cardFileName); // Сохраните путь к изображению
          }

          // Создайте CardImage записи для каждого изображения карточки
          for (const imageUrl of cardImageUrls) {
            await CardImage.create({
              cardId: card.id,
              fileName: imageUrl,
            });
          }
        }
      }
      return res.json(project);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteProject(req, res, next) {
    try {
      const { id } = req.params;

      const project = await Project.findByPk(id);

      if (!project) {
        return next(ApiError.notFound("Проект не найден"));
      }

      await project.destroy();

      return res.json({ message: "Проект удален" });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAllProjects(req, res, next) {
    try {
      let { categoryId, limit, page } = req.query;
      page = page || 1;
      limit = limit || 3;
      let offset = page * limit - limit;
      let projects;

      const order = [["createdAt", "DESC"]]; // Сортировка по дате добавления в убывающем порядке

      if (!categoryId) {
        projects = await Project.findAndCountAll({
          include: [
            {
              model: Card,
              as: "cards",
            },
            {
              model: ProjectInfo,
              as: "info",
            },
          ],
          limit,
          offset,
          order,
        });
      }

      if (categoryId) {
        projects = await Project.findAndCountAll({
          include: [
            {
              model: Card,
              as: "cards",
            },
            {
              model: ProjectInfo,
              as: "info",
            },
          ],
          where: { projectCategoryId: categoryId },
          limit,
          offset,
          order,
        });
      }

      return res.json(projects);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async getOneProject(req, res, next) {
    try {
      const { id } = req.params;
      const project = await Project.findByPk(id, {
        include: [
          {
            model: Card,
            as: "cards",
          },
          {
            model: ProjectInfo,
            as: "info",
          },
        ],
      });
      if (!project) {
        throw ApiError.notFound("Проект не найден");
      }
      return res.json(project);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  // async updateProject(req, res, next) {
  //   try {
  //     const { id } = req.params;
  //     let { name, stage, descr, info, cards, img, pageImg, categoryId } =
  //       req.body;

  //     let project = await Project.findByPk(id, {
  //       include: [
  //         {
  //           model: Card,
  //           as: "cards",
  //           include: [
  //             {
  //               model: CardImage,
  //               as: "cardImages",
  //             },
  //           ],
  //         },
  //         {
  //           model: ProjectInfo,
  //           as: "info",
  //         },
  //       ],
  //     });

  //     if (!project) {
  //       return next(ApiError.notFound("Проект не найден"));
  //     }

  //     // Update the project fields
  //     project.name = name;
  //     project.stage = stage;
  //     project.descr = descr;
  //     project.categoryId = categoryId;

  //     console.log('Before updating - img filename:', project.img);
  //     console.log('Before updating - pageImg filename:', project.pageImg);

  //     // If there's a new img, update the img
  //     if (img) {
  //       let fileName = uuid.v4() + ".jpg";
  //       console.log("Before moving img:", fileName);
  //       await img.mv(path.resolve(__dirname, "..", "static", fileName));
  //       project.img = fileName;
  //     }

  //     // If there's a new pageImg, update the pageImg
  //     if (pageImg) {
  //       let pageImgFileName = uuid.v4() + ".jpg";
  //       console.log("Before moving pageImg:", pageImgFileName);
  //       await pageImg.mv(
  //         path.resolve(__dirname, "..", "static", pageImgFileName)
  //       );
  //       project.pageImg = pageImgFileName;
  //     }

  //     await project.save(); // Save the updated project

  //     // Log the filenames after moving the images
  //     console.log("After moving images - img filename:", project.img);
  //     console.log("After moving images - pageImg filename:", project.pageImg);

  //     // If there's new info, update the info
  //     if (info) {
  //       await ProjectInfo.destroy({
  //         where: { projectId: project.id },
  //       });

  //       info = JSON.parse(info);
  //       info.forEach((i) =>
  //         ProjectInfo.create({
  //           title: i.title,
  //           description: i.description,
  //           projectId: project.id,
  //         })
  //       );
  //     }

  //     // If there are new cards, update or create the cards
  //     if (cards) {
  //       cards = JSON.parse(cards);

  //       for (const cardData of cards) {
  //         let card;

  //         if (cardData.id) {
  //           // If we have the card ID, it's an existing card - update it
  //           card = await Card.findByPk(cardData.id);
  //           card.title = cardData.title;
  //           await card.save();
  //         } else {
  //           // If we don't have the card ID, it's a new card - create it
  //           card = await Card.create({
  //             title: cardData.title,
  //             projectId: project.id,
  //           });

  //           const cardImageUrls = [];

  //           for (const imgData of cardData.images) {
  //             const cardFileName = uuid.v4() + ".jpg";
  //             await imgData.mv(
  //               path.resolve(__dirname, "..", "static", cardFileName)
  //             );
  //             cardImageUrls.push(cardFileName);
  //           }

  //           for (const imageUrl of cardImageUrls) {
  //             await CardImage.create({
  //               cardId: card.id,
  //               fileName: imageUrl,
  //             });
  //           }
  //         }
  //       }
  //     }

  //     // Fetch the updated project with associated data
  //     project = await Project.findByPk(id, {
  //       include: [
  //         {
  //           model: Card,
  //           as: "cards",
  //           include: [
  //             {
  //               model: CardImage,
  //               as: "cardImages",
  //             },
  //           ],
  //         },
  //         {
  //           model: ProjectInfo,
  //           as: "info",
  //         },
  //       ],
  //     });

  //     return res.json(project);
  //   } catch (e) {
  //     next(ApiError.badRequest(e.message));
  //   }
  // }

  async updateProject(req, res, next) {
    try {
      const { id } = req.params;
      const { info, cards } = req.body;
      const { img, pageImg } = req.files;

      let project = await Project.findByPk(id);

      if (!project) {
        return next(ApiError.notFound("Проект не найден"));
      }

      const { name, stage, descr, projectCategoryId } = req.body;

      // Update project fields
      project.name = name;
      project.stage = stage;
      project.descr = descr;
      project.projectCategoryId = projectCategoryId;

      // Update images only if new ones are provided
      if (img) {
        const imgFileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, "..", "static", imgFileName));
        project.img = imgFileName;
      }

      if (pageImg) {
        const pageImgFileName = uuid.v4() + ".jpg";
        pageImg.mv(path.resolve(__dirname, "..", "static", pageImgFileName));
        project.pageImg = pageImgFileName;
      }

      await project.save();

      // Update project info
      await ProjectInfo.destroy({
        where: { projectId: project.id },
      });

      if (info) {
        const infoData = JSON.parse(info);
        infoData.forEach((i) =>
          ProjectInfo.create({
            title: i.title,
            description: i.description,
            projectId: project.id,
          })
        );
      }

      // Update or create cards
      if (cards) {
        const cardsData = JSON.parse(cards);

        for (const cardData of cardsData) {
          let card;

          if (cardData.id) {
            // If we have the card ID, it's an existing card - update it
            card = await Card.findByPk(cardData.id);
            card.title = cardData.title;
            await card.save();
          } else {
            // If we don't have the card ID, it's a new card - create it
            card = await Card.create({
              title: cardData.title,
              projectId: project.id,
            });

            for (const imgData of cardData.images) {
              const cardFileName = uuid.v4() + ".jpg";
              imgData.mv(path.resolve(__dirname, "..", "static", cardFileName));
              await CardImage.create({
                cardId: card.id,
                fileName: cardFileName,
              });
            }
          }
        }
      }

      // Fetch the updated project with associated data
      project = await Project.findByPk(id, {
        include: [
          {
            model: Card,
            as: "cards",
            include: [
              {
                model: CardImage,
                as: "cardImages",
              },
            ],
          },
          {
            model: ProjectInfo,
            as: "info",
          },
        ],
      });

      return res.json(project);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new ProjectController();
