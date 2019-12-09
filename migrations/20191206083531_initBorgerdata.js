
exports.up = async function(knex) {
    await knex.schema.createTable(process.env.SQL_TABLE, table => {
        table
            .specificType('CPR', 'CHAR(10)')
            .notNullable();
        table
            .specificType('Fornavn', 'NVARCHAR(50)');
        table
            .specificType('Mellemnavn', 'NVARCHAR(40)');
        table
            .specificType('Efternavn', 'NVARCHAR(40)');
        table
            .specificType('Adresseringsnavn', 'NVARCHAR(132)');
        table
            .specificType('Vejnavn', 'NVARCHAR(40)');
        table
            .specificType('Husnr', 'VARCHAR(4)')
        table
            .specificType('Etage', 'VARCHAR(2)')
        table
            .specificType('Side', 'VARCHAR(4)');
        table
            .specificType('Adresseringsadresse', 'NVARCHAR(53)');
        table
            .specificType('Bynavn', 'VARCHAR(40)');
        table
            .specificType('Postnummer', 'CHAR(4)');
        table
            .specificType('Postdistrikt', 'VARCHAR(20)');
        table
            .specificType('PostnummerOgBy', 'VARCHAR(25)');
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTable(process.env.SQL_TABLE);
};
