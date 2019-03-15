import Index from "./../Page/Index/Index.vue" // 主页

export default [{
    path: '/',
    name: 'Index',
    component: Index,
    children: [{
        path: '/',
        name: 'HotWork',
        component: () => import("./../Page/Index/Components/HotWork.vue"),
      },
      {
        path: '/ScientificResearchWork',
        name: 'ScientificResearchWork',
        component: () => import("./../Page/Index/Components/ScientificResearchWork.vue"),
      },
      {
        path: '/CompetitionWork',
        name: 'CompetitionWork',
        component: () => import("./../Page/Index/Components/CompetitionWork.vue"),
      }
    ],
    redirect: '/'
  },
  {
    path: '/Work',
    name: 'Work',
    component: () => import("./../Page/Work/Work.vue"),
  },
  {
    path: '/Team',
    name: 'Team',
    component: () => import("./../Page/Team/Team.vue"),
    children: [{
      path: '/',
      name: 'TeamList',
      component: () => import("./../Page/Team/Components/TeamList.vue"),
    }],
    redirect: 'Team'
  },
  {
    path: '/Honor',
    name: 'Honor',
    component: () => import("./../Page/Honor/Honor.vue"),
  },
  {
    path: '/Problem',
    name: 'Problem',
    component: () => import("./../Page/Problem/Problem.vue"),
  },
  {
    path: '/Works/WorksDetails:pkId',
    name: 'WorksDetails',
    component: () => import("./../Page/Work/WorkDetail/WorksDetails.vue"),
  },
  {
    path: '/Team/TeamDetail:pkId',
    name: 'TeamDetail',
    component: () => import("./../Page/Team/TeamDetail/TeamDetail.vue"),
  },
  {
    path: '/Honor/HonorDetail:pkId',
    name: 'HonorDetail',
    component: () => import("./../Page/Honor/HonorDetail/HonorDetail.vue"),
  }
]
