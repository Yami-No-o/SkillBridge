// src/data/mockAdminData.js — SkillBridge Admin Mock Data

export const workers = [
  { id: 'w1',  name: 'Priya Menon',    zone: 'Koramangala',    skills: ['Electrician','Wiring'],          status: 'Verified', rating: 4.9, joinDate: '2024-01-12' },
  { id: 'w2',  name: 'Rajan Kumar',    zone: 'Whitefield',     skills: ['Plumber','Pipe Fitting'],        status: 'Verified', rating: 4.7, joinDate: '2024-02-03' },
  { id: 'w3',  name: 'Suresh Babu',    zone: 'Yelahanka',      skills: ['Carpenter','Furniture'],         status: 'Pending',  rating: 0,   joinDate: '2024-03-18' },
  { id: 'w4',  name: 'Anita Das',      zone: 'Hebbal',         skills: ['Painter','Interior'],            status: 'Verified', rating: 4.8, joinDate: '2024-01-29' },
  { id: 'w5',  name: 'Mohan Rao',      zone: 'Sarjapur',       skills: ['AC Repair','HVAC'],              status: 'Pending',  rating: 0,   joinDate: '2024-04-05' },
  { id: 'w6',  name: 'Kavitha Nair',   zone: 'HSR Layout',     skills: ['Cook','Catering'],               status: 'Verified', rating: 4.6, joinDate: '2024-02-14' },
  { id: 'w7',  name: 'Dinesh Shetty',  zone: 'Banashankari',   skills: ['Driver','Delivery'],             status: 'Flagged',  rating: 2.1, joinDate: '2024-03-01' },
  { id: 'w8',  name: 'Lakshmi Devi',   zone: 'BTM Layout',     skills: ['Housekeeping','Cleaning'],       status: 'Verified', rating: 4.5, joinDate: '2024-01-07' },
  { id: 'w9',  name: 'Arjun Reddy',    zone: 'Electronic City', skills: ['IT Support','Networking'],      status: 'Pending',  rating: 0,   joinDate: '2024-04-20' },
  { id: 'w10', name: 'Fatima Khan',    zone: 'Marathahalli',   skills: ['Tailor','Alteration'],           status: 'Verified', rating: 4.3, joinDate: '2024-02-22' },
  { id: 'w11', name: 'Venkat Swamy',   zone: 'Yelahanka',      skills: ['Gardener','Landscaping'],        status: 'Verified', rating: 4.7, joinDate: '2024-03-10' },
  { id: 'w12', name: 'Deepa Sharma',   zone: 'Koramangala',    skills: ['Tutor','Teaching'],              status: 'Pending',  rating: 0,   joinDate: '2024-04-28' },
  { id: 'w13', name: 'Rajesh Pillai',  zone: 'HSR Layout',     skills: ['Mason','Construction'],          status: 'Verified', rating: 4.4, joinDate: '2024-01-15' },
  { id: 'w14', name: 'Sunita Yadav',   zone: 'Whitefield',     skills: ['Nurse','Elder Care'],            status: 'Verified', rating: 4.9, joinDate: '2024-02-08' },
  { id: 'w15', name: 'Manohar Goud',   zone: 'Sarjapur',       skills: ['Welder','Metal Work'],           status: 'Flagged',  rating: 1.8, joinDate: '2024-03-25' },
  { id: 'w16', name: 'Sowmya Rao',     zone: 'Hebbal',         skills: ['Data Entry','Admin'],            status: 'Verified', rating: 4.2, joinDate: '2024-04-01' },
  { id: 'w17', name: 'Karthik Iyer',   zone: 'BTM Layout',     skills: ['Appliance Repair','Electronic'], status: 'Verified', rating: 4.6, joinDate: '2024-01-30' },
  { id: 'w18', name: 'Mamatha Gowda',  zone: 'Banashankari',   skills: ['Babysitter','Child Care'],       status: 'Pending',  rating: 0,   joinDate: '2024-05-02' },
  { id: 'w19', name: 'Imran Sheikh',   zone: 'Electronic City', skills: ['Security','CCTV'],              status: 'Verified', rating: 4.1, joinDate: '2024-02-17' },
  { id: 'w20', name: 'Geetha Kumari',  zone: 'Marathahalli',   skills: ['Yoga','Fitness'],                status: 'Pending',  rating: 0,   joinDate: '2024-05-10' },
];

export const jobs = [
  { id: 'j1',  title: 'Fix electrical wiring',    zone: 'Koramangala',    postedBy: 'Arun M',      date: '2024-05-01', status: 'Completed', isTeamJob: false },
  { id: 'j2',  title: 'Bathroom pipe leakage',    zone: 'Whitefield',     postedBy: 'Neha S',      date: '2024-05-03', status: 'Matched',   isTeamJob: false },
  { id: 'j3',  title: 'Full home painting',        zone: 'Hebbal',         postedBy: 'Rohan G',     date: '2024-05-05', status: 'Open',      isTeamJob: true  },
  { id: 'j4',  title: 'AC service & gas refill',   zone: 'Sarjapur',       postedBy: 'Meera T',     date: '2024-05-06', status: 'Matched',   isTeamJob: false },
  { id: 'j5',  title: 'Kitchen renovation',        zone: 'BTM Layout',     postedBy: 'Vijay K',     date: '2024-05-07', status: 'Open',      isTeamJob: true  },
  { id: 'j6',  title: 'Wardrobe carpentry',        zone: 'Yelahanka',      postedBy: 'Pooja R',     date: '2024-05-08', status: 'Open',      isTeamJob: false },
  { id: 'j7',  title: 'Event catering (50 pax)',   zone: 'HSR Layout',     postedBy: 'Sameer J',    date: '2024-05-09', status: 'Matched',   isTeamJob: true  },
  { id: 'j8',  title: 'CCTV installation',         zone: 'Electronic City', postedBy: 'Divya N',    date: '2024-05-10', status: 'Completed', isTeamJob: false },
  { id: 'j9',  title: 'Daily housekeeping',        zone: 'Marathahalli',   postedBy: 'Kiran L',     date: '2024-05-11', status: 'Open',      isTeamJob: false },
  { id: 'j10', title: 'Network setup office',      zone: 'Koramangala',    postedBy: 'Suresh B',    date: '2024-05-11', status: 'Open',      isTeamJob: false },
  { id: 'j11', title: 'Move furniture (2BHK)',     zone: 'Whitefield',     postedBy: 'Ananya D',    date: '2024-05-12', status: 'Matched',   isTeamJob: true  },
  { id: 'j12', title: 'Appliance repair mix',      zone: 'BTM Layout',     postedBy: 'Rahul P',     date: '2024-05-12', status: 'Completed', isTeamJob: false },
  { id: 'j13', title: 'Elder care (live-in)',       zone: 'Hebbal',         postedBy: 'Preethi V',   date: '2024-05-13', status: 'Open',      isTeamJob: false },
  { id: 'j14', title: 'Metal gate fabrication',    zone: 'Sarjapur',       postedBy: 'Santosh A',   date: '2024-05-13', status: 'Open',      isTeamJob: false },
  { id: 'j15', title: 'Garden landscaping 3BHK',  zone: 'Yelahanka',      postedBy: 'Rekha M',     date: '2024-05-14', status: 'Open',      isTeamJob: false },
];

export const bookings = [
  { id: 'b1',  workerName: 'Priya Menon',   seekerName: 'Arun M',    jobTitle: 'Fix electrical wiring',  date: '2024-05-01', amount: 850,  status: 'Completed'  },
  { id: 'b2',  workerName: 'Rajan Kumar',   seekerName: 'Neha S',    jobTitle: 'Bathroom pipe leakage',  date: '2024-05-03', amount: 600,  status: 'Confirmed'  },
  { id: 'b3',  workerName: 'Anita Das',     seekerName: 'Rohan G',   jobTitle: 'Full home painting',     date: '2024-05-05', amount: 4200, status: 'Confirmed'  },
  { id: 'b4',  workerName: 'Mohan Rao',     seekerName: 'Meera T',   jobTitle: 'AC service & gas refill', date: '2024-05-06', amount: 1100, status: 'Confirmed'  },
  { id: 'b5',  workerName: 'Kavitha Nair',  seekerName: 'Sameer J',  jobTitle: 'Event catering',         date: '2024-05-09', amount: 5500, status: 'Confirmed'  },
  { id: 'b6',  workerName: 'Imran Sheikh',  seekerName: 'Divya N',   jobTitle: 'CCTV installation',      date: '2024-05-10', amount: 2200, status: 'Completed'  },
  { id: 'b7',  workerName: 'Lakshmi Devi',  seekerName: 'Kiran L',   jobTitle: 'Daily housekeeping',     date: '2024-05-11', amount: 400,  status: 'Confirmed'  },
  { id: 'b8',  workerName: 'Karthik Iyer',  seekerName: 'Rahul P',   jobTitle: 'Appliance repair mix',   date: '2024-05-12', amount: 950,  status: 'Completed'  },
  { id: 'b9',  workerName: 'Sunita Yadav',  seekerName: 'Preethi V', jobTitle: 'Elder care (live-in)',    date: '2024-05-13', amount: 3000, status: 'Confirmed'  },
  { id: 'b10', workerName: 'Dinesh Shetty', seekerName: 'Vijay K',   jobTitle: 'Kitchen renovation',     date: '2024-05-07', amount: 1500, status: 'Cancelled'  },
  { id: 'b11', workerName: 'Rajesh Pillai', seekerName: 'Ananya D',  jobTitle: 'Move furniture (2BHK)',  date: '2024-05-12', amount: 1800, status: 'Confirmed'  },
  { id: 'b12', workerName: 'Venkat Swamy',  seekerName: 'Rekha M',   jobTitle: 'Garden landscaping',     date: '2024-05-14', amount: 2400, status: 'Confirmed'  },
];

export const stats = {
  totalWorkers:        20,
  activeJobs:          9,
  completedBookings:   3,
  totalEarningsRouted: 23500,
};

// Chart helpers
export const jobsByZone = [
  { zone: 'Koramangala',    jobs: 3 },
  { zone: 'Whitefield',     jobs: 2 },
  { zone: 'Hebbal',         jobs: 2 },
  { zone: 'Sarjapur',       jobs: 2 },
  { zone: 'BTM Layout',     jobs: 2 },
  { zone: 'Yelahanka',      jobs: 2 },
  { zone: 'HSR Layout',     jobs: 1 },
  { zone: 'Electronic City', jobs: 1 },
  { zone: 'Marathahalli',   jobs: 1 },
];

export const workerStatusSplit = [
  { name: 'Verified', value: 11, color: '#2d6a4f' },
  { name: 'Pending',  value:  7, color: '#e09d2b' },
  { name: 'Flagged',  value:  2, color: '#dc2626' },
];
