db.createUser(
    {
        user : "weacm",
        pwd : "weacm",
        roles : [
            {
                role : "readWrite",
                db : "waecm-2022-group-08-bsp-2-mongoDb"
            }
        ]
    }
)
