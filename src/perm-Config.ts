const role = {
  maholan_superadmin: 'maholan_superadmin',
  superadmin: 'superadmin',
  eventmaster: 'eventmaster',
};

export const event = {
  view: [role.maholan_superadmin],
  create: [role.maholan_superadmin],
  update: [role.maholan_superadmin, role.eventmaster],
  delete: [role.maholan_superadmin],
  approve: [role.maholan_superadmin],
  finish: [role.maholan_superadmin],
};
