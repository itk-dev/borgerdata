
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(process.env.SQL_SCHEMA + '.' + process.env.SQL_TABLE).del()
    .then(function () {
      // Inserts seed entries
      return knex(process.env.SQL_SCHEMA + '.' + process.env.SQL_TABLE).insert([
        {CPR: 1234567891, Fornavn: 'Hans', Efternavn: 'Hansen', Vejnavn: 'Testvej', Husnr: '11', Bynavn: 'Roskilde', Postnummer: '4000'},
        {CPR: 3213214567, Fornavn: 'Peter', Efternavn: 'Petersen', Vejnavn: 'Kiddevej', Husnr: '56', Bynavn: 'Kolding', Postnummer: '6000'},
        {CPR: 7823492345, Fornavn: 'Merete', Efternavn: 'Finnsen', Vejnavn: 'Skovvej', Husnr: '3', Bynavn: 'Odense', Postnummer: '5000'}
      ]);
    });
};
