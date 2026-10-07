/* Dr Kusum R. Gandhi — site scripts. Each block runs only on the page that needs it. */
(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};

/* ---------------- chips helper ---------------- */
function chips(host,items,onPick){
  var state=items[0].k;
  items.forEach(function(it){
    var b=document.createElement('button');
    b.type='button'; b.className='chip'; b.dataset.k=it.k;
    b.setAttribute('aria-pressed',it.k===state?'true':'false');
    b.innerHTML=(it.c?'<i style="--c:var('+it.c+')"></i>':'')+esc(it.l)+(it.n!=null?' <small>'+it.n+'</small>':'');
    b.addEventListener('click',function(){
      state=it.k;
      $$('.chip',host).forEach(function(x){x.setAttribute('aria-pressed',x.dataset.k===state?'true':'false')});
      onPick(state);
    });
    host.appendChild(b);
  });
}

/* ---------------- projects ---------------- */
if($('#proj-list')){
  var THEMES={anthro:'Anthropometry',gross:'Gross and neuroanatomy',histo:'Histology',gen:'Genetics',clin:'Clinical and community'};
  var STATUS={done:'Completed or published',on:'Ongoing',prop:'Proposal stage'};
  var PROJECTS=[
   {t:'Influence of dominant somatotype on physical fitness and happiness of adults affected by non-communicable diseases visiting a tertiary care centre, AIIMS Bhopal, Central India',th:'anthro',s:'done',sl:'Completed',role:'Principal Investigator',fund:'DST-SERB extramural grant EEQ/2021/000624 · ₹18,31,472',feature:1},
   {t:'Correlation between anthropometric parameters of the hand and musculoskeletal pain in the thumb and wrist due to overuse of smartphones in adults: an observational study at AIIMS Bhopal',th:'anthro',s:'on',sl:'Ongoing',role:'Co-Principal Investigator',fund:'ICMR-STS · ₹50,000',team:'Mr Deepanshu Mahawar',link:['Related paper, 2023','https://doi.org/10.34256/ijk2316']},
   {t:'Influence of dominant somatotype on physical fitness and happiness of adult individuals of Central India: an observational study',th:'anthro',s:'on',sl:'Ongoing',role:'Principal Investigator',team:'Dr Ragini Srivastava, Dr Prashant Chaware'},
   {t:'Nasofaciometric analysis and its association with the stature of the Central Indian population: a baseline study',th:'anthro',s:'on',sl:'Ongoing',role:'Principal Investigator',team:'Dr Prashant Chaware'},
   {t:'Assessment of nutritional condition using the Mini-Nutritional Assessment tool and anthropometric parameters among the elderly population of Central India: a cross-sectional study at AIIMS Bhopal',th:'anthro',s:'on',sl:'Ongoing',role:'MD (Medicine) thesis project, 2024–25'},
   {t:'Gross morphological and micro-anatomical features of the triceps surae muscle complex and its extensions in humans',th:'gross',s:'on',sl:'Ongoing',role:'Principal Investigator',team:'Dr Sumit Patil, Dr Prashant Chaware'},
   {t:'Morphometric analysis of the perisylvian region of the human brain with particular reference to the motor speech area: a cadaveric study',th:'gross',s:'on',sl:'Ongoing',role:'Principal Investigator',team:'Dr Prashant Chaware'},
   {t:'Neuromuscular compartments and nerve ramification patterns in the extraocular muscles of humans: a cadaveric study',th:'gross',s:'on',sl:'Ongoing',role:'Co-Investigator',team:'Dr Sunita Athavale (PI), Dr Rekha Lalwani (Co-PI), Dr Sheetal Kotgirwar (Co-I)'},
   {t:'Gross morphological and micro-anatomical features of the atrio-ventricular heart valvular complex in hypertensive individuals brought for medico-legal autopsy at AIIMS Bhopal',th:'histo',s:'on',sl:'Ongoing',role:'Principal Investigator',team:'Dr Jayanthi Yadav (Co-PI), Dr Bertha Rathinam (Co-I), Dr Anuradha Singh (Co-I)'},
   {t:'Histological alterations in the integumentary system of SARS-CoV-2 infected and non-infected individuals brought for autopsy in a tertiary care health institute of Central India',th:'histo',s:'prop',sl:'Under process',role:'Principal Investigator',team:'Dr Prashant Chaware (Co-PI), Dr Arneet Arora (Co-I), Dr Sumit Patil (Co-I)'},
   {t:'A prospective study of the association between histological changes in the placenta and umbilical cord complex and the level of placental growth factor in the serum of women with high-risk pregnancy',th:'histo',s:'prop',sl:'Under review',role:'Principal Investigator',fund:'Intramural proposal · ₹5,00,000',team:'Dr Pushplatha K (Co-PI), Dr Ashok Kumar (Co-I)'},
   {t:'Spectrum of mutations in the candidate genes in patients with juvenile myoclonic epilepsy: a study from Central India',th:'gen',s:'prop',sl:'Submitted',role:'Principal Investigator',fund:'Submitted for extramural funding',team:'Dr Prashant Chaware (Co-PI), Dr Bhavana Dhingra (Co-I), Dr Ashok Kumar (Co-I), Dr Bertha Rathinam (Co-I)'},
   {t:'Evaluation of sleep pattern due to stress in undergraduate medical students and its impact on health and academic performance: a cross-sectional study in a tertiary health centre of Central India',th:'clin',s:'done',sl:'Published',role:'Co-Principal Investigator',fund:'ICMR-STS · ₹50,000',team:'Mr Yashvardhan Godaria'},
   {t:'Assessment of the effect of antihypertensive medication along with yoga in hypertensive patients with the help of circulating oxidative stress markers: a hospital-based study',th:'clin',s:'prop',sl:'Under review',role:'Principal Investigator',fund:'Proposal under review for extramural funding',team:'Dr Rajnish Joshi (Co-PI), Dr Shweta Tiwari (Co-I)'},
   {t:'Nutritional status and its association with blood parameters, socio-demographic factors and perceived well-being in elderly patients at a Central Indian tertiary care geriatric clinic: a cross-sectional study',th:'clin',s:'on',sl:'Ongoing',role:'MD (Medicine) thesis project'}
  ];
  var pf={th:'all',s:'all'};
  function renderProjects(){
    var rows=PROJECTS.filter(function(p){return (pf.th==='all'||p.th===pf.th)&&(pf.s==='all'||p.s===pf.s)});
    $('#proj-count').textContent=rows.length+(rows.length===1?' project':' projects');
    $('#proj-list').innerHTML=rows.length?rows.map(function(p){
      return '<li'+(p.feature?' class="feature"':'')+'><div class="proj-side"><span class="pill '+p.s+'">'+esc(p.sl)+'</span><span class="mono">'+esc(THEMES[p.th])+'</span></div>'+
        '<div class="proj-main"><h3>'+esc(p.t)+'</h3><div class="meta"><span><b>'+esc(p.role)+'</b></span>'+
        (p.fund?'<span>'+esc(p.fund)+'</span>':'')+'</div>'+
        (p.team?'<div class="meta"><span>With '+esc(p.team)+'</span></div>':'')+
        (p.link?'<a class="plink" href="'+esc(p.link[1])+'" target="_blank" rel="noopener">'+esc(p.link[0])+' ↗</a>':'')+
        '</div></li>';
    }).join(''):'<li class="empty">No projects match both filters. Try another theme or status.</li>';
  }
  function cnt(arr,key,val){return arr.filter(function(x){return x[key]===val}).length}
  chips($('#proj-theme'),[{k:'all',l:'All',n:PROJECTS.length}].concat(Object.keys(THEMES).map(function(k){return {k:k,l:THEMES[k],n:cnt(PROJECTS,'th',k)}})),function(k){pf.th=k;renderProjects()});
  chips($('#proj-status'),[{k:'all',l:'All'}].concat(Object.keys(STATUS).map(function(k){return {k:k,l:STATUS[k],n:cnt(PROJECTS,'s',k)}})),function(k){pf.s=k;renderProjects()});
  renderProjects();
}

/* ---------------- presentations ---------------- */
if($('#pres-list')){
  var KINDS={talk:['Talks and lectures','--artery'],paper:['Papers presented','--vein'],org:['Organising','--nerve'],train:['Workshops, CMEs and conferences','--muted']};
  var KIND1={talk:'Talk',paper:'Paper',org:'Organising',train:'Attended'};
  var PIMS='Pravara Institute of Medical Sciences, Loni';
  var PRES=[
   [2022,'14 Oct','talk','Lecture: “Development of tongue, blood and nerve supply, muscles of tongue and mastication”','Vishnu Dental College, Bhimavaram'],
   [2022,'7–9 Jun','train','National workshop on Ayurgenomics, Prakriti methods and integrative medicine for wellness','CSIR-IGIB, New Delhi'],
   [2022,'8 Mar','org','Organising team, International Women’s Day webinar “Gender equality today for a sustainable tomorrow”','GATI (DST) pilot project, AIIMS Bhopal'],
   [2021,'8 Sep','train','CME: Basics of newborn screening','Department of Pediatrics, AIIMS Bhopal'],
   [2021,'16 Aug','talk','Webinar lecture: “Covid-19 vaccination: why the entire population must be vaccinated”','MPCST and GMC Bhopal'],
   [2021,'7 Aug','train','Workshop: Introduction to mind-body medicine','Departments of Radiotherapy, Physiology and AYUSH, AIIMS Bhopal'],
   [2021,'19–20 Jun','talk','Panelist, lecture series for the 7th International Day of Yoga','Department of AYUSH, AIIMS Bhopal'],
   [2021,'17–19 Mar','train','Training-the-trainers CME workshop on Ayurgenomics, Prakriti methods and integrative medicine for wellness','CSIR-IGIB TRISUTRA Ayurgenomics unit, New Delhi'],
   [2021,'16–18 Feb','org','Organising member, Gender Sensitization Training','Internal Complaints Committee, AIIMS Bhopal'],
   [2020,'31 Aug','talk','“Body donation, embalming and cadaveric dissection: perspectives in the Covid era”','Department of Anatomy, MMIMSR, Ambala, Haryana'],
   [2020,'12 Jun','train','Session: Using a sense-of-coherence lens to view humanity’s response to the pandemic','AVMC'],
   [2019,'18–20 Nov','paper','“Comparative study on the morphology of spleen in cadaveric and autopsy specimens”','NATCON 67, National Conference of the Anatomical Society of India, Dr Ambedkar International Centre, New Delhi'],
   [2019,'15–21 Feb','train','Seven-day hands-on training: Molecular biology, genomics and bioinformatics','Centre of Excellence in Biotechnology, MPCST, Bhopal'],
   [2018,'14 Nov','paper','Co-speaker: “A cadaveric study of accessory maxillary ostium and its clinical implications”','NATCON 66, AIIMS Rishikesh'],
   [2018,'12 Nov','talk','Invited research presentation: “Anatomical variations in the morphology of lumbar sympathetic ganglia in human cadavers”','NATCON 66, National Conference of the Anatomical Society of India, AIIMS Rishikesh'],
   [2016,'9–10 Apr','talk','Invited research presentation: “Role of bioethics in medical education”','5th National Conference of the Society of Clinical Anatomists (SOCA), Sri Guru Ram Das Institute of Medical Sciences and Research, Amritsar'],
   [2015,'21–23 Nov','paper','“The morphology of inferior transverse scapular ligament in human cadavers”','National Conference of the Anatomical Society of India, King George’s Medical University, Lucknow'],
   [2015,'21 Nov','talk','Chaired a poster session','National Conference of the Anatomical Society of India, Lucknow'],
   [2014,'19–20 Sep','paper','“The anatomy of pelvi-caliceal system in adult human kidneys”','MAHACON-I 2014, N.K.P. Salve Institute of Medical Sciences and Research Centre, Nagpur'],
   [2014,'7–9 Jul','train','Basic Workshop in Medical Education Technologies, conducted by IMETT, MUHS-RC, Pune',PIMS],
   [2014,'7–8 Mar','train','CME on Development Genetics','MGM Medical College, Aurangabad'],
   [2011,'25–30 Jul','train','Teacher Training Workshop in Medical Education Technology',PIMS],
   [2010,'26–29 Dec','paper','“Morphometric assessment of greater palatine foramen with adjacent anatomical landmarks”','58th National Conference of the Anatomical Society of India, Padmashree Dr D. Y. Patil Medical College, Pune'],
   [2010,'23 Oct','train','CME: Deformities of foot and its correction',PIMS],
   [2010,'18 Oct','train','CME: Projection of pertinent present-day issues in patient care',PIMS],
   [2010,'15 Oct','train','CME: Neurological disorders, pathophysiology and management',PIMS],
   [2010,'19 Aug','paper','“The study of lumbar plexus and its variations”','Research Scientific Meet, '+PIMS],
   [2010,'8 Aug','train','National Symposium on Medical Documentation: ethical, legal and social aspects',PIMS],
   [2009,'25 Dec','paper','“Study of lumbar plexus and its variations”','57th National Conference of the Anatomical Society of India, Belgaum, Karnataka'],
   [2009,'9 Oct','train','CME: Pain, pathophysiology and management',PIMS],
   [2009,'8 Aug','train','CME: Emergencies in clinical medicine',PIMS],
   [2009,'25 Jun','train','Leprosy orientation and training workshop',PIMS],
   [2009,'4 Apr','train','CME: Legal aspects of medical science',PIMS],
   [2009,'8 Feb','train','National seminar: Reaching healthcare to the hitherto unreached through medical education',PIMS],
   [2008,'27–29 Dec','train','NATCON-ASI, National Conference of the Anatomical Society of India','Varanasi'],
   [2008,'26 Dec','train','CME-cum-workshop on electron microscopy in medical research','56th National Conference of the Anatomical Society of India, Varanasi'],
   [2008,'2–7 May','train','Workshop on basic research methodology in medical and health sciences',PIMS],
   [2006,'10 Dec','train','Seminar on diabetes','Dr Vikhe Patil Memorial Hospital and Medical College, Ahmednagar']
  ];
  var presKind='all';
  function renderPres(){
    var rows=PRES.filter(function(p){return presKind==='all'||p[2]===presKind});
    $('#pres-count').textContent=rows.length+(rows.length===1?' entry':' entries');
    var byYear={},order=[];
    rows.forEach(function(p){ if(!byYear[p[0]]){byYear[p[0]]=[];order.push(p[0])} byYear[p[0]].push(p) });
    $('#pres-list').innerHTML=order.map(function(y){
      return '<section class="year"><h3>'+y+'</h3><ul>'+byYear[y].map(function(p){
        return '<li class="talk t-'+p[2]+'"><i aria-hidden="true"></i><div><span class="kind">'+esc(KIND1[p[2]])+' · '+esc(p[1])+'</span><p>'+esc(p[3])+'</p><span class="where">'+esc(p[4])+'</span></div></li>';
      }).join('')+'</ul></section>';
    }).join('');
  }
  chips($('#pres-type'),[{k:'all',l:'All',n:PRES.length}].concat(Object.keys(KINDS).map(function(k){
    return {k:k,l:KINDS[k][0],c:KINDS[k][1],n:PRES.filter(function(p){return p[2]===k}).length};
  })),function(k){presKind=k;renderPres()});
  renderPres();
}

/* ---------------- publications ---------------- */
if($('#pub-list')){
  var PUBS=[
   [2023,'Gandhi KR, Patil ST, Kumar B, Patel M, Chaware P, Ahmad M, Pandita K, Parate SB','Morphometry and intracranial relations of the sphenoid sinus in context to endoscopic transnasal transsphenoidal surgery','Cureus','2023;15(6):e40187',[['DOI','https://doi.org/10.7759/cureus.40187'],['PubMed','https://pubmed.ncbi.nlm.nih.gov/37431332/']]],
   [2023,'Chaware P, Kumar B, Patil S, Surya, Rathinam B, Gandhi K, et al.','A cadaveric study to define morphology and morphometry of human knee menisci in the region of Central India','Cureus','2023;15(6):e41174',[['DOI','https://doi.org/10.7759/cureus.41174']]],
   [2023,'Patil S, Rathinam B, Kumar B, Gandhi KR, et al.','A cadaveric study to define the variant patterns of median nerve formation','Cureus','2023;15(5):e39806',[['DOI','https://doi.org/10.7759/cureus.39806']]],
   [2023,'Gandhi KR, M S, Mahaver D, Shandilya A, Bhagat OL','Analysis of correlation between anthropometry of hand and smartphone overuse on musculoskeletal pain in thumb/wrist in medical students: a cross-sectional study at a tertiary care center of Central India','International Journal of Kinanthropometry','2023;3(1):47–57',[['DOI','https://doi.org/10.34256/ijk2316']]],
   [2023,'Gandhi KR, Patil ST, Kumar B, Patel M, Chaware P','Study of frontal and ethmoid sinus of sinonasal complex along with olfactory fossa: anatomical considerations for endoscopic sinus surgery','Anatomy & Cell Biology','2023;56(2):179–184',[['DOI','https://doi.org/10.5115/acb.22.230'],['PubMed','https://pubmed.ncbi.nlm.nih.gov/36748370/']]],
   [2022,'Gandhi K, Godaria Y, Revadi G','Sleep pattern and stress among undergraduate medical students: cross-sectional study from Central India','Applied Physiology and Anatomy Digest','2022;6(04):5–16'],
   [2021,'Gandhi K, Jaison J, Mantri E','Unilateral non-rotated left kidney with vascular and ureter variations in a cadaver: a unique case report with embryological and educational aspects','Jornal Vascular Brasileiro','2021;20:e20200156',[['DOI','https://doi.org/10.1590/1677-5449.200156'],['PubMed','https://pubmed.ncbi.nlm.nih.gov/34630538/']]],
   [2019,'Gandhi K, Yadav N','The anatomy of accessory obturator nerve in human cadavers','Indian Journal of Anatomy','2019;8(3):187–190'],
   [2019,'Gandhi K, Yadav N','Unique anatomical variations in the buccal branch of facial nerve on both sides of a male cadaver','World Journal of Pharmaceutical and Life Sciences','2019;5(8):156–158'],
   [2019,'Gandhi K, Mantri E','A cadaveric study of accessory maxillary ostium and its clinical implications','European Journal of Pharmaceutical and Medical Research','2019;6(7):680–683'],
   [2019,'Gandhi KR, Chavan S','Revisiting the morphology of pelvicalyceal system in human cadaveric kidneys with a systematic review of literature','Asian Journal of Urology','2019;6:249–255'],
   [2018,'Gandhi KR, Lakshmi KNV','High origin of radial artery: an anatomical variation with its embryological basis and clinical significance','International Journal of Health Sciences and Research','2018;8(6):52–55'],
   [2017,'Gandhi KR','Euthanasia: a brief history and perspectives in India','International Journal of Education and Research in Health Sciences','2017;3(2):105–108'],
   [2016,'Gandhi KR, Siddiqui AU, Verma VK','The glenoid cavity: its morphology and clinical significance','International Journal of Biological and Medical Research','2016;7(2):5552–5555'],
   [2015,'Gandhi KR, Wabale RN, Farooqui MS','Bilateral presentation of tensor fascia suralis muscle in a male cadaver','International Journal of Anatomy and Research','2015;3(4):1745–48'],
   [2015,'Gandhi KR, Wabale RN','A rare presentation of extrarenal pelvis containing multiple calculi','Pravara Medical Review','2015;7(2):30–32'],
   [2015,'Gandhi KR, Wabale RN, Siddiqui AU, Farooqui MS','The incidence and morphology of maxillary sinus septa in dentate and edentulous maxillae: a cadaveric study with a brief review of the literature','Journal of the Korean Association of Oral and Maxillofacial Surgeons','2015;41(1):30–36'],
   [2014,'Gandhi KR, Verma HV, Siddiqui AU, Wabale RN','A retroaortic left renal vein associated with a partially bifid left ureter: case report','European Journal of Anatomy','2014;18(1):42–44'],
   [2013,'Verma H, Gandhi K','A comparative study of efficacy of calcium + vitamin D3 and calcium + vitamin D3 + vitamin K2 in prevention of osteoporosis in postmenopausal osteopenic women who are adopting a sedentary pattern of lifestyle','Journal of Evolution of Medical and Dental Sciences','2013;20(20):6–9'],
   [2013,'Siddiqui AU, Gandhi KR, Daimi SRH','A unique presentation of parietal notch bone with coexisting multiple wormian bones and complete metopism','International Journal of Biomedical Research','2013;4(10):571–73'],
   [2013,'Gandhi K, Verma V, Chavan S, Joshi SD, Joshi SS','The morphology of lumbar sympathetic trunk in humans: a cadaveric study','Folia Morphologica','2013;72(3):217–222'],
   [2013,'Gandhi K, Joshi SD, Joshi SS, Siddiqui A, Jalaj A','Lumbar plexus and its variations','Journal of the Anatomical Society of India','2013;62(1):47–51',null,'Dr H. J. Mehta Award'],
   [2013,'Siddiqui AU, Daimi SRH, Gandhi KR, Siddiqui AT, Trivedi S, Sinha MB, Rathore M','Crista terminalis, musculi pectinati, and taenia sagittalis: anatomical observations and applied significance','ISRN Anatomy','2013;1:1–6'],
   [2013,'Siddiqui AU, Gandhi KR, Daimi SRH, Saxena S, Trivedi S, Sinha MB, Rathore M','Morphometric assessment of the greater palatine foramen with the adjacent anatomical landmarks','Indian Journal of Anatomy','2013;2(2):61–66'],
   [2013,'Gandhi KR, Chavan S, Oommen SA','Spleen with multiple notches: a rare anatomical variant with its clinical significance','International Journal of Students’ Research','2013;3:24–5'],
   [2013,'Verma H, Gandhi K','The study of relationship between undercarboxylated osteocalcin and administration of vitamin K2, vitamin D3 and calcium in prevention of osteoporosis in postmenopausal osteopenic women who are adopting a sedentary lifestyle','International Journal of Pharmacology and Therapeutics','2013;3(2)'],
   [2012,'Gandhi KR, Siddiqui AU, Wabale RN, Daimi SR','The accessory fallopian tube: a rare anomaly','Journal of Human Reproductive Sciences','2012;5:293–4'],
   [2010,'Daimi SR, Siddiqui AU, Gandhi KR','Additional tendinous insertions of biceps brachii: a case report','Pravara Medical Review','2010;5(1):16–18']
  ];
  var pubYear=null,pubQ='';
  function boldMe(a){return esc(a).replace(/Gandhi (KR|K)\b/g,'<b>Gandhi $1</b>')}
  function renderPubs(){
    var q=pubQ.trim().toLowerCase();
    var rows=PUBS.filter(function(p){
      if(pubYear && p[0]!==pubYear) return false;
      if(q && (p[1]+' '+p[2]+' '+p[3]+' '+p[0]).toLowerCase().indexOf(q)<0) return false;
      return true;
    });
    var bits=[rows.length+' of '+PUBS.length+' listed'];
    if(pubYear) bits.push('year '+pubYear);
    $('#pub-count').textContent=bits.join(' · ');
    $('#pub-clear').hidden=!pubYear;
    $('#pub-list').innerHTML=rows.length?rows.map(function(p){
      var links=(p[5]||[]).map(function(l){return '<a class="plink" href="'+esc(l[1])+'" target="_blank" rel="noopener">'+esc(l[0])+' ↗</a>'}).join('');
      var badge=p[6]?'<span class="badge">'+esc(p[6])+'</span>':'';
      return '<li class="pub"><span class="yr">'+p[0]+'</span><div><h3>'+esc(p[2])+'</h3><p class="au">'+boldMe(p[1])+'</p><p class="jr">'+esc(p[3])+' <span>'+esc(p[4])+'</span></p>'+
        ((links||badge)?'<div class="links">'+badge+links+'</div>':'')+'</div></li>';
    }).join(''):'<li class="empty">No publication matches. Clear the search or choose another year.</li>';
    $$('#pub-bars .bar').forEach(function(b){ if(!b.disabled) b.setAttribute('aria-pressed',Number(b.dataset.y)===pubYear?'true':'false') });
  }
  (function bars(){
    var host=$('#pub-bars'),counts={},max=0,y;
    PUBS.forEach(function(p){counts[p[0]]=(counts[p[0]]||0)+1; if(counts[p[0]]>max) max=counts[p[0]]});
    for(y=2010;y<=2023;y++){
      var n=counts[y]||0,b=document.createElement('button');
      b.type='button'; b.className='bar'; b.dataset.y=y;
      b.setAttribute('aria-label',y+': '+n+(n===1?' paper':' papers'));
      if(!n) b.disabled=true; else b.setAttribute('aria-pressed','false');
      b.innerHTML='<span class="v">'+(n||'')+'</span><span class="b" style="height:'+(n?Math.round(n/max*100):0)+'px"></span><span class="y">’'+String(y).slice(2)+'</span>';
      host.appendChild(b);
    }
    host.addEventListener('click',function(e){
      var b=e.target.closest('.bar'); if(!b||b.disabled) return;
      var yy=Number(b.dataset.y); pubYear=(pubYear===yy)?null:yy; renderPubs();
    });
  })();
  $('#pub-q').addEventListener('input',function(e){pubQ=e.target.value;renderPubs()});
  $('#pub-clear').addEventListener('click',function(){pubYear=null;renderPubs()});
  renderPubs();
}

/* ---------------- somatochart ---------------- */
if($('#soma-pt')){
  (function(){
    var ids=['endo','meso','ecto'],inp={},out={};
    ids.forEach(function(k){inp[k]=$('#s-'+k);out[k]=$('#o-'+k)});
    var NAME={endo:'endomorph',meso:'mesomorph',ecto:'ectomorph'},ADJ={endo:'Endomorphic',meso:'Mesomorphic',ecto:'Ectomorphic'};
    var PAIR={'endo+meso':'Mesomorph–endomorph','ecto+meso':'Mesomorph–ectomorph','ecto+endo':'Endomorph–ectomorph'};
    function classify(v){
      var c=ids.map(function(k){return [k,v[k]]}).sort(function(a,b){return b[1]-a[1]});
      if(c[0][1]-c[2][1]<=1) return 'Central';
      if(c[0][1]-c[1][1]<=.5) return PAIR[[c[0][0],c[1][0]].sort().join('+')];
      if(c[1][1]-c[2][1]<=.5) return 'Balanced '+NAME[c[0][0]];
      return ADJ[c[1][0]]+' '+NAME[c[0][0]];
    }
    function fmt(n){return (n<0?'−':'')+Math.abs(n).toFixed(1)}
    function draw(){
      var v={}; ids.forEach(function(k){v[k]=parseFloat(inp[k].value);out[k].textContent=v[k].toFixed(1)});
      var X=v.ecto-v.endo, Y=2*v.meso-(v.endo+v.ecto);
      var cx=160+X*16, cy=185-Y*9.5;
      ['#soma-pt','#soma-halo'].forEach(function(s){var el=$(s);el.setAttribute('cx',cx);el.setAttribute('cy',cy)});
      $('#soma-cross').setAttribute('d','M'+cx+' 185 V'+cy+' M160 '+cy+' H'+cx);
      $('#soma-name').textContent=classify(v);
      $('#soma-xy').textContent=v.endo.toFixed(1)+' – '+v.meso.toFixed(1)+' – '+v.ecto.toFixed(1)+'  ·  X '+fmt(X)+' · Y '+fmt(Y);
    }
    ids.forEach(function(k){inp[k].addEventListener('input',draw)});
    draw();
  })();
}

/* ---------------- copy email ---------------- */
if($('#mail-copy')){
  $('#mail-copy').addEventListener('click',function(){
    var btn=this,addr=$('#mail-addr'),text=addr.textContent;
    function done(msg){btn.textContent=msg;setTimeout(function(){btn.textContent='Copy email'},1800)}
    function select(){var r=document.createRange();r.selectNodeContents(addr);var s=getSelection();s.removeAllRanges();s.addRange(r);done('Selected, press copy')}
    try{ navigator.clipboard.writeText(text).then(function(){done('Copied')},select); }catch(e){ select(); }
  });
}

})();
