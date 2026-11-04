// Patient testimonials from samatvam.org.
// Phone numbers and email addresses shown on the old site are intentionally left out.

export type Testimonial = {
  name: string;
  date: string;
  profile: string;
  occupation: string;
  firstVisit: string;
  /** Paragraphs separated by blank lines. */
  text: string;
};

export const testimonials: Testimonial[] = [
  {
    name: 'Mr Balakrishna Adiga',
    date: '02 Jan 2020',
    profile: '60 years, Male, Bangalore, India',
    occupation: 'BE, MBA, IT industry consultant and private',
    firstVisit: 'June 2011',
    text: "It is difficult to call SAMATVAM - JNANA SANJEEVINI HEALTH CARE SERVICES a hospital or a clinic. It is more like a temple or even one's mother's home where all worries are forgotten. I have been going there for past 8 years and I have only positive experiences. Dr Srikanta as a person is epitome of positive thinking and healer supreme. His positive compassionate attitude has rubbed off to the entire staff. India needs more institutions like SAMATVAM - JNANA SANJEEVINI HEALTH CARE SERVICES and India will be a much better place.",
  },
  {
    name: 'Ms Ratan Gopinath',
    date: '03 Feb 2020',
    profile: '61 years, Female, Bangalore, India',
    occupation: 'BEd, PGDTE, Teacher',
    firstVisit: '2002',
    text: 'In the year 2002, I went through a bout of ill health and had to undergo a number of clinical investigations. They pointed to an endocrine problem and that is how I was referred to Dr. Srikanta and Samatvam. Further tests showed that I was suffering from a hypo-pituitary condition that required immediate medication and treatment. This was how I became a regular at Samatvam/Jnana Sanjeevini and Dr. Srikanta and his team became my caregivers and friends. Dr. Srikanta gave me some wonderful advice : “Just swallow the tablets that you have been prescribed, be peaceful and get on with your life”. In the seventeen years that I have known him, I have always admired Dr. Srikanata’s thirst for knowledge (and its dissemination), his unique commitment to research and his desire to improve his patients’ lives in a holistic way. I am grateful to all at Jnana Sanjeevini for giving me the confidence that ill-health is a hiccup and that they are there to help me to deal with it.',
  },
  {
    name: 'Ms Usha Dhiman',
    date: '10 Feb 2020',
    profile: '66 years, Female, NEW DELHI, India',
    occupation: 'Graduation, Service',
    firstVisit: 'November 2011 to receive gold medal for living with diabetes for more than 50 years.',
    text: 'Samatvam is run on complete different ideals. Unlike other hospitals it is a place where the needy, poor and homeless are not only treated at par with other patients (like children from the nearby villages) but are specially given free education, consultations, free strips and even meters which they obviously cannot afford but which essential to keep their Type 1 diabetes under control.\n\nSamatvam is run on charity given by the benevolent and generous people and business houses who know the great work being done by Dr. S.S. Srikanta and his excellent team. They work round the clock and so many times put work before self as a result missing meals and working beyond their hours. Knowledge is imparted to all and anyone can walk through the door and will be treated with love and devotion by the entire staff. Samatvam follows the ideals of Mother Theresa, Sri Aurobindo and the Bhagvad Gita, and this reflects in the service they provide to mankind.\n\nI have visited Samatvam a couple of times and was housed with one of their staff member who looked after me as a family member and made me feel so much at home. I have not seen such kindness, passion and selfless work done for the patients anywhere else. Especially the poor who cannot even afford food, and are shunned by the society, they find succor here at Samatvam.\n\nI have always returned with awe on seeing the sincere and long hours put in by the staff and of course lead by Dr. S.S. Srikanta who forgets to eat and drink when he is engrossed with the patients, staff or holding various seminars and conference.\n\nPray God helps SAMATVAM - JNANA SANJEEVINI HEALTH CARE SERVICES reach milestones never achieved before.',
  },
  {
    name: 'Eng. Mugisha Hilary',
    date: '16 Apr 2019',
    profile: '43 years, Male, MBARARA, UGANDA',
    occupation: 'MSc (Urban Infrastructure Management), Civil Engineer',
    firstVisit: 'September/2017',
    text: 'Namaste, I was diagnosed with suspicious thyroid nodular disease in Uganda in 2017 after undertaking numerous diagnostic tests, a total thyroidectomy (complete thyroid removal) was undertaken in 2 surgeries. After the surgeries, I received contradicting pathology reports with suspicions of malignancy ranging from follicular carcinoma to colloid goiter disease.\n\nMy doctors in Uganda with Prof Norlias from Cuba resolved to refer me to the only National Cancer Institute in Kampala for radiotherapy treatment considering the pathology discrepancies it was agreed to over treat than under treat with radiation therapy. The team at the Uganda Cancer Institute evaluated and approved the need for radiation therapy, unfortunately lacked the prerequisites to undertake the treatment.\n\nThanks to my family, relatives and friends we mobilized resources in 2 weeks to travel and receive the missing treatment in Bangalore India. In India I received diagnostic interventions from many private facilities. Throughout the diagnostic processes in Bangalore Doctors kept referring my case to more senior doctors to handle, until I ended up in the hands of Dr Srikanta of Samatvan Jnana Sanjeevini.\n\nThank God for Dr Srikanta of Samatvan Jnana Sanjeevini who on top of systematic evaluation of my entire medical reports and prescribed the appropriate treatment, He provided the spiritual support to calm down the storm that had been boiling in my life for the whole year\n\nEven during my subsequent visit in India for medical review in September 2018, contradicting FNAC report resurfaced but with expert teams analysis headed by Dr Shanta Krishnamurthy and Dr Srikanta I was saved from unwanted radiation therapy the second time.\n\nCurrently I’am health wise very okay undertaking my routine job and career activities while continuously participation in Rotary cancer fundraising especially the annual cancer Marathon sessions.\n\nMany thanks and gratitude to the medical teams in Uganda and India especially Dr Srikanta of Samatvan Janna Sanjeevini Health services for the comprehensive evaluation of my complex medical condition, provision of appropriate treatment, emotional and spiritual support.',
  },
];
