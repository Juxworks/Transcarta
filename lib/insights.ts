export type InsightBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }

export type Insight = {
  id: string
  slug: string
  outlet: string
  title: string
  summary: string
  topic: string
  date: string
  image: string
  content: InsightBlock[]
}

export const insights: Insight[] = [
  {
    id: 'insight-1',
    slug: 'startups-battle-bugs',
    outlet: 'Impact Entrepreneur',
    title: 'Start-ups Battle Bugs to Help Farmers in Southeast Asia',
    summary:
      'Climate change is exacerbating agricultural challenges in Southeast Asia by increasing droughts, shifting temperatures, and enabling invasive pests like the Fall Armyworm to thrive. Farmers are moving away from traditional pest scouting toward innovative, technology-driven solutions from regional start-ups.',
    topic: 'Agriculture & Climate',
    date: '2024',
    image: '/publication-bugs.webp',
    content: [
      {
        type: 'paragraph',
        text: 'As climate change intensifies, the number of insect pests that devour crops has increased too. In times past, farmers scouted through fields nearly every day, looking for pests. Now, start-ups are delivering solutions that automate scouting while reducing costs and pesticides.',
      },
      {
        type: 'heading',
        text: 'Climate Change Leads to More Insect Pests in Farmers’ Fields',
      },
      {
        type: 'paragraph',
        text: 'In recent decades, innovation in agriculture has led to tremendous increases in production, which has helped to feed a rapidly growing global population. This progress is threatened by climate change, researchers led by Pennsylvania State University’s Bijay Subedi explained, due to issues such as carbon dioxide increases, frequent droughts and temperature shifts. Climate change can also increase the likelihood of new pests and alter the distribution and abundance of existing pests, which can reduce productivity and crop yields.',
      },
      {
        type: 'paragraph',
        text: 'One example is the Fall Armyworm, which the ASEAN Secretariat said was first reported in late 2018 in Thailand and Myanmar. The pest feeds on more than 350 plant species and can cause major damage to crops such as maize. It spreads rapidly and is now endemic in most ASEAN countries.',
      },
      {
        type: 'paragraph',
        text: 'Farmers have long used “pest scouting” to identify insect pests and other problems, such as diseases. Entomologist Muhammad Abdul Rehman explains that pest scouting involves the systematic and regular inspection of crop fields to detect and assess pests. Scouting is important because it helps farmers decide on pest control measures, which can minimise crop losses and promote sustainable agriculture. Early identification of pest infestations can reduce crop losses by up to 40 percent, according to the Food and Agriculture Organization, and pest scouting can also contribute to environmental sustainability because farmers can minimise chemical pesticide use. In the US, for instance, the Environmental Protection Agency said integrated pest management practices (IPM) such as scouting reduced pesticide usage by up to 50 percent.',
      },
      {
        type: 'heading',
        text: 'Technology Boosts Scouting Effectiveness and Environmental Sustainability',
      },
      {
        type: 'paragraph',
        text: 'In a long growing season on a farm, EOS Data Analytics explained, many things can go wrong. Pests, diseases, weeds, weather. On a small scale, they may go unnoticed. Over time, they result in lower yields and less revenue. To prevent this, farmers have to check their crops at least weekly – or even more often.',
      },
      {
        type: 'paragraph',
        text: '“One of the best ways to manage fall armyworm and reduce crop loss is early detection through regular physical scouting,” Grow Asia consultant Alison Watson told AgNews. “Farmers should scout early and often, up to three times a week at the start of the new season.”',
      },
      {
        type: 'paragraph',
        text: 'Until recently, researcher Jerry Heaps noted, pest monitoring has often been done by visual inspection, insect light traps, sticky insect pheromone traps with scents to attract specific insects, or glue boards. While farmers have found insects with these on-site observations, it takes a lot of time.',
      },
      {
        type: 'paragraph',
        text: 'Drones and smartphone apps as well as other technologies are now giving them far better ways to battle the pests. Drones help smallholder farmers shift to more precise agricultural practices that reduce pesticide use, Watson said, and farm management apps can provide early warning pest alerts and advice.',
      },
      {
        type: 'paragraph',
        text: 'In India, for instance, Eurasia Review said crop surveillance includes checking for pest attacks and monitoring the effect of weather. Farmers can use drones to inspect the field with infrared cameras and use their real-time information to improve the condition of plants or apply fertiliser at the right time. Drones with special imaging equipment called Normalized Difference Vegetation Index allow farmers to monitor crops as they grow and deal with problems fast enough to save the plants.',
      },
      {
        type: 'paragraph',
        text: 'A multitude of start-ups in Southeast Asia also have innovative solutions for scouting.',
      },
      {
        type: 'paragraph',
        text: 'In Vietnam, for example, RYNAN Technologies’ system enables farmers to detect insect populations through insect image capture, collection, and analysis of field data with artificial intelligence (AI) and machine learning. In Trat province, for example, its Insect Monitoring System (IMS) uses data-driven approaches for pest outbreak predictions and weather forecasting that enhance durian crop health and yields. Farmers can track population trends, pinpoint threats, and minimise unnecessary chemical use. The system uses AI to identify and count more than 150 types of insects automatically, including harmful and harmless insects as well as beneficial organisms. Rynan collects, screens, sorts and analyses the data, then returns the results to the farmer using graphs and visual maps. The system also gives warnings and predictions about the insect situation so farmers can choose methods for treatment.',
      },
      {
        type: 'paragraph',
        text: 'Smart Farm Agritech is an AI technology and precision farming company in Malaysia that combines satellite and drone crop surveillance technology for pest and disease management. It uses AI applications and drones to develop recommendations for organic biopesticides. Its proprietary technologies, such as large-scale crop health surveillance and a disease recognition AI, assists farmers in making better decisions on pest and disease control measures so they can prevent yield losses. Its NightFlight service applies pesticides after dark, when moths and other rice pests are most active, which is the most effective way of dealing with them.',
      },
      {
        type: 'paragraph',
        text: 'In Thailand, Ricult goes further and provides digital solutions that cover every aspect of farming and can make agriculture more profitable. Its integrated digital platform provides smallholder farmers with access to farm inputs, agronomic insights, and connections to end buyers. Ricult’s credit scoring algorithm uses alternative data as well as satellite imagery, weather and soil analytics to assess farmer’s risk-levels so they can obtain loans more easily. The same data gives insights to key farming factors such as potential crop yield, pest attack prevention, proper fertilization, key harvesting time, and optimal crop rotation.',
      },
      {
        type: 'paragraph',
        text: 'MimosaTEK in Vietnam takes it a step further by testing models that can leverage natural deterrents and create biological barriers. Along with monitoring the usage of fertilisers and pesticides, it is building a model that combines technology with biology so that products have no pesticide residue or have levels below the threshold of rules and requirements for importing into the European Union, Tuoi Tre newspaper reported.',
      },
      {
        type: 'paragraph',
        text: 'Even though the proliferation of insect pests due to climate change is making agriculture more difficult, tech from start-ups can help farmers mitigate the problems and may enable them to make more money.',
      },
    ],
  },
]
