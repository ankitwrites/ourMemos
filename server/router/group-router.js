const express = require("express")
const router = express.Router()
const groupController = require("../controllers/group-controller")
const groupMemoController = require("../controllers/groupmemo-controller")
const { getAllUsers } = require("../controllers/admin-controller")
const authMiddleware = require("../middlewares/auth-middleware")

router
    .route("/create")
    .post(authMiddleware, groupController.createGroup)

router
    .route("/")
    .get(authMiddleware, groupController.getGroups)

router
    .route("/users")
    .get(authMiddleware, getAllUsers)

router
    .route("/updatemember/:id")
    .patch(authMiddleware, groupController.updateMembers)

router
    .route("/members/:id")
    .get(authMiddleware, groupController.getGroupMembers)

router
    .route("/admins/:id")
    .get(authMiddleware, groupController.getGroupAdmins)

router
    .route("/post")
    .post(authMiddleware, groupMemoController.postGroupMemo)

router
    .route("/:id")
    .get(authMiddleware, groupMemoController.getAllGroupMemos)

router
    .route("/name/:id")
    .get(authMiddleware, groupController.getGroupName)

router
    .route("/memo/like/:id")
    .patch(authMiddleware, groupMemoController.updateGroupLikes)

router
    .route("/memo/comment/:id")
    .patch(authMiddleware, groupMemoController.updateGroupComments)

router
    .route("/delete/:id")
    .delete(authMiddleware, groupController.deleteGroup)

module.exports = router