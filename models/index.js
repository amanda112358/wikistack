const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    dialect: 'postgres',
    logging: false,
});

const Page = db.define(
    'page',
    {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        urlTitle: {
            type: Sequelize.STRING,
            allowNull: false,
            get() {
                const urlTitle = this.getDataValue('urlTitle');
                return `/wiki/${urlTitle}`;
            },
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        status: {
            type: Sequelize.ENUM('open', 'closed'),
        },
        date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
    },
    {
        // prettier-ignore
        hooks: {
            beforeValidate: function(page) {
                if (page.title) {
                    page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
                } else {
                    page.urlTitle = Math.random().toString(36).substring(2, 7);
                }
            },
        },
    }
);

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
});

module.exports = db;
