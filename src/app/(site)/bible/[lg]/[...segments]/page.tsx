// import { redirect } from "next/navigation";

import { HtmlContentRenderer } from "@/frontend/website/components/html-content-renderer";
import { Fragment } from "react";

export interface BibleDynamicPageProps {
  params: Promise<{ [key: string]: string | string[] }>;
}

// interface IBibleDynamicPageContent {
//   content: string;
//   title: string;
//   url: string;
//   linkToDefaultContent: null | string;
//   nextLink: string | null;
//   prevLink: string | null;
// }

const tmpContent = `
<div class="scalable-section">ՍՏԵՂԾԱԳՈՐԾՈՒԹԵԱՆ ՊԱՏՄՈՒԹԻՒՆԸ
  &nbsp;&nbsp;&nbsp;

<a href="bible/commentaryongenesis1:1">1. Ի սկզբանէ Աստուած ստեղծեց երկինքն ու երկիրը:</a>
<a href="bible/commentaryongenesis1:2">2. Երկիրն անձեւ ու անկազմ էր, խաւար էր տիրում անհունի վրայ, եւ Աստծու հոգին շրջում էր ջրերի վրայ:</a>
<a href="bible/commentaryongenesis1:3">3. Եւ Աստուած ասաց. «Թող լոյս լինի»: Եւ լոյս եղաւ:</a>
<a href="bible/commentaryongenesis1:4">4. Աստուած տեսաւ, որ լոյսը լաւ է, եւ Աստուած լոյսը բաժանեց խաւարից:</a>
<a href="bible/commentaryongenesis1:5">5. Աստուած լոյսը կոչեց ցերեկ, իսկ խաւարը կոչեց գիշեր: Եւ եղաւ երեկոյ, եւ եղաւ առաւօտ՝ օր առաջին:</a>
<a href="bible/commentaryongenesis1:6">6. Աստուած ասաց. «Թող տարածութիւն առաջանայ ջրերի միջեւ, եւ ջրերը թող բաժանուեն ջրերից»: Եւ եղաւ այդպէս:</a>
<a href="bible/commentaryongenesis1:7">7. Աստուած ստեղծեց տարածութիւնը, որով Աստուած տարածութեան ներքեւում եղած ջրերը անջրպետեց տարածութեան վրայ եղած ջրերից:</a>
<a href="bible/commentaryongenesis1:8">8. Աստուած տարածութիւնը կոչեց երկինք: Աստուած տեսաւ, որ լաւ է: Եւ եղաւ երեկոյ, եւ եղաւ առաւօտ՝ օր երկրորդ:</a>
<a href="bible/commentaryongenesis1:9">9. Աստուած ասաց. «Թող երկնքի տակ գտնուող ջրերը հաւաքուեն մի տեղ, եւ երեւայ ցամաքը»: Եւ եղաւ այդպէս. երկնքի տակի ջրերը հաւաքուեցին մի տեղ, ու երեւաց ցամաքը:</a>
<a href="bible/commentarygenesis1:10">10. Աստուած ցամաքը կոչեց երկիր, իսկ հաւաքուած ջրերը կոչեց ծով: Աստուած տեսաւ, որ լաւ է:</a>
<a href="bible/commentaryongenesis1:11">11. Աստուած ասաց. «Թող երկիրը իր տեսակի ու իր նմանութեան սերմը պարունակող դալար բոյս եւ իր տեսակի ու իր նմանութեան սերմը պարունակող, իր տեսակի միրգ տուող պտղաբեր ծառ աճեցնի երկրի վրայ»: Եւ եղաւ այդպէս.</a>
<a href="bible/commentaryongenesis1:12">12. հողը ամբողջ երկրի վրայ ցանելու սերմը իր մէջ պարունակող դալար բոյս եւ իր տեսակի սերմը իր մէջ պարունակող, միրգ տուող ծառ աճեցրեց: Աստուած տեսաւ, որ լաւ է:</a>
<a href="bible/commentaryongenesis1:13">13. Եւ եղաւ երեկոյ, եւ եղաւ առաւօտ՝ օր երրորդ:</a>
<a href="bible/commentaryongenesis1:14">14. Աստուած ասաց. «Թող լուսատուներ լինեն երկնքի տարածութեան մէջ, որպէսզի լուսաւորեն երկիրը եւ իրարից բաժանեն ցերեկն ու գիշերը: Դրանք թող լինեն, որպէսզի ցոյց տան տարուայ եղանակները, տօնական օրերն ու տարիները,</a>
<a href="bible/commentaryongenesis1:15">15. թող լինեն, ծագեն երկնքի տարածութեան մէջ՝ երկիրը լուսաւորելու համար»: Եւ եղաւ այդպէս:</a>
<a href="bible/commentaryongenesis1:16">16. Աստուած ստեղծեց երկու մեծ լուսատուներ. մեծ լուսատուն՝ ցերեկն իշխելու, իսկ փոքր լուսատուն՝ գիշերն իշխելու համար, ինչպէս նաեւ աստղեր:</a>
<a href="bible/commentaryongenesis1:17">17. Աստուած դրանք դրեց երկնքի տարածութեան մէջ՝ երկիրը լուսաւորելու համար,</a>
<a href="bible/commentaryongenesis1:18">18. ինչպէս նաեւ ցերեկուայ ու գիշերուայ վրայ իշխելու եւ լոյսն ու խաւարը իրարից բաժանելու համար: Աստուած տեսաւ, որ լաւ է:</a>
<a href="bible/commentaryongenesis1:19">19. Եւ եղաւ երեկոյ, եւ եղաւ առաւօտ՝ օր չորրորդ:</a>
<a href="bible/commentarygenesis1:20">20. Աստուած ասաց. «Թող ջրերն արտադրեն կենդանութեան շունչ ունեցող զեռուններ, եւ երկրի վրայ ու երկնքի տարածութեան մէջ թող թեւաւոր թռչուններ լինեն»: Եւ եղաւ այդպէս:</a>
<a href="bible/commentaryongenesis1:21">21. Աստուած ստեղծեց խոշոր կէտեր, կենդանութեան շունչ ունեցող ամէն տեսակ զեռուններ, որ արտադրեցին ջրերն ըստ տեսակների, եւ ամէն տեսակ թեւաւոր թռչուններ՝ ըստ տեսակների: Աստուած տեսաւ, որ լաւ է:</a>
<a href="bible/commentaryongenesis1:22">22. Աստուած օրհնեց դրանց ու ասաց. «Աճեցէ՛ք, բազմացէ՛ք եւ լցրէ՛ք ծովերի ջրերը, իսկ թռչունները թող բազմանան երկրի վրայ»:</a>
<a href="bible/commentaryongenesis1:23">23. Եւ եղաւ երեկոյ, եւ եղաւ առաւօտ՝ օր հինգերորդ:</a>
<a href="bible/commentaryongenesis1:24">24. Աստուած ասաց. «Թող երկիրն արտադրի չորքոտանի կենդանիներ իրենց տեսակներով, սողուններ եւ գազաններ իրենց տեսակներով»: Եւ եղաւ այդպէս:</a>
<a href="bible/commentarygenesis1:25">25. Աստուած ստեղծեց երկրի գազաններն իրենց տեսակներով, անասուններն իրենց տեսակներով եւ երկրի բոլոր սողուններն իրենց տեսակներով: Աստուած տեսաւ, որ դրանք լաւ են:</a>
<a href="bible/commentaryongenesis1:26">26. Աստուած ասաց. «Մարդ ստեղծենք մեր կերպարանքով ու նմանութեամբ, նա թող իշխի ծովի ձկների, երկնքի թռչունների, ողջ երկրի անասունների եւ երկրի վրայ սողացող բոլոր սողունների վրայ»:</a>
<a href="bible/commentaryongenesis1:27">27. Եւ Աստուած մարդուն ստեղծեց իր պատկերով, Աստծու պատկերով ստեղծեց նրան, արու եւ էգ ստեղծեց նրանց:</a>
<a href="bible/commentaryongenesis1:28">28. Աստուած օրհնեց նրանց ու ասաց. «Աճեցէ՛ք, բազմացէ՛ք, լցրէ՛ք երկիրը, տիրեցէ՛ք դրան, իշխեցէ՛ք ծովի ձկների, երկնքի թռչունների, ողջ երկրի բոլոր անասունների ու երկրի վրայ սողացող բոլոր սողունների վրայ»:</a>
<a href="bible/commentaryongenesis1:29">29. Աստուած ասաց. «Ահա ձեզ տուեցի ողջ երկրի վրայ տարածուած սերմանելի բոլոր բոյսերի սերմերը եւ իրենց մէջ պտուղ սերմանելու սերմ պարունակող բոլոր ծառերը: Դրանք թող ձեզ համար սնունդ լինեն,</a>
<a href="bible/commentaryonthebookofgenesis1:30">30. իսկ բոլոր կանաչ խոտերը երկրի բոլոր գազանների, երկնքի բոլոր թռչունների եւ երկրի վրայ սողացող բոլոր սողունների՝ բոլոր կենդանիների համար թող լինեն կեր»: Եւ եղաւ այդպէս:</a>
<a href="bible/commentaryongenesis1:31">31. Աստուած տեսաւ, որ այն ամէնը, ինչ ստեղծել էր, շատ լաւ է: Եւ եղաւ երեկոյ, եւ եղաւ առաւօտ՝ օր վեցերորդ:</a></div>
`;

export default async function BibleDynamicPage(props: BibleDynamicPageProps) {
  // console.log("BibleDynamicPage", props);
  const {
    segments,
    // lg
  } = await props.params;
  if (segments.length < 3) {
    throw new Error("Invalid segments length. Expected 3 or more segments.");
  }
  // const [testament, book, chapter] = segments;
  // const data = await fetch(
  //   `http://192.168.2.179:8080/bibles/chapters/?url=bible/${lg}/${testament}/${book}/${chapter}`
  // );
  // const page = (await data.json()) as IBibleDynamicPageContent;
  return (
    <Fragment>
      <HtmlContentRenderer content={tmpContent} />
    </Fragment>
  );
}
