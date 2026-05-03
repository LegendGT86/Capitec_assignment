export const bookingData = {
  create: {
    firstname: 'James',
    lastname: 'Brown',
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: '2025-01-01',
      checkout: '2025-01-05',
    },
    additionalneeds: 'Breakfast',
  },

  update: {
    firstname: 'Jenny',
    lastname: 'Frost',
    totalprice: 200,
    depositpaid: true,
    bookingdates: {
      checkin: '2025-02-01',
      checkout: '2025-02-05',
    },
    additionalneeds: 'Lunch',
  },

  invalid: {
    firstname: '',
    lastname: '',
    totalprice: -1,
    depositpaid: false,
    bookingdates: {
      checkin: '',
      checkout: '',
    },
    additionalneeds: '',
  },
};