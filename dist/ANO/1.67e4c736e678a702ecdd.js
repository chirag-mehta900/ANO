(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"64/j":function(e,t,n){"use strict";n.r(t),n.d(t,"HomePageModule",function(){return f});var i=n("ofXK"),a=n("tyNb"),o=n("3Pt+"),l=n("j0wc"),r=n("fXoL"),m=n("1kSV"),d=n("xql5"),s=n("0L5U");function c(e,t){if(1&e){const e=r["\u0275\u0275getCurrentView"]();r["\u0275\u0275elementStart"](0,"div",82),r["\u0275\u0275listener"]("click",function(){r["\u0275\u0275restoreView"](e);const n=t.$implicit;return r["\u0275\u0275nextContext"](2).OnChange(n)}),r["\u0275\u0275element"](1,"img",83),r["\u0275\u0275elementStart"](2,"h2"),r["\u0275\u0275text"](3),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"]()}if(2&e){const e=t.$implicit;r["\u0275\u0275advance"](1),r["\u0275\u0275propertyInterpolate"]("src",e.image,r["\u0275\u0275sanitizeUrl"]),r["\u0275\u0275advance"](2),r["\u0275\u0275textInterpolate"](e.heading)}}function g(e,t){if(1&e&&(r["\u0275\u0275elementStart"](0,"div",74),r["\u0275\u0275elementStart"](1,"div",27),r["\u0275\u0275element"](2,"div",75),r["\u0275\u0275elementStart"](3,"div",76),r["\u0275\u0275elementStart"](4,"div",77),r["\u0275\u0275elementStart"](5,"h2"),r["\u0275\u0275text"](6),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](7,"p"),r["\u0275\u0275text"](8),r["\u0275\u0275elementEnd"](),r["\u0275\u0275element"](9,"div",78),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](10,"div",79),r["\u0275\u0275elementStart"](11,"carousel",80),r["\u0275\u0275template"](12,c,4,2,"div",81),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"]()),2&e){const e=t.$implicit,n=r["\u0275\u0275nextContext"]();r["\u0275\u0275styleMapInterpolate1"]("background-image: url(",e.image,");"),r["\u0275\u0275advance"](6),r["\u0275\u0275textInterpolate"](e.heading),r["\u0275\u0275advance"](2),r["\u0275\u0275textInterpolate"](e.content),r["\u0275\u0275advance"](3),r["\u0275\u0275property"]("height",190)("cellWidth",278)("arrowsOutside",!0),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngForOf",n.slider)}}const p=[{path:"",component:(()=>{class e{constructor(e,t,n){this.modalService=e,this.header=t,this.router=n,this.Data=[],this.slider=[],this.display=[],this.selectedImg=["http://placehold.it/350x150/000000","http://placehold.it/350x150/000000","http://placehold.it/350x150/000000","http://placehold.it/350x150/000000","http://placehold.it/350x150/000000","http://placehold.it/350x150/000000","http://placehold.it/350x150/000000","http://placehold.it/350x150/000000","http://placehold.it/350x150/000000","http://placehold.it/350x150/000000"],this.Location={lat:0,lng:0,Icon:{url:"https://firebasestorage.googleapis.com/v0/b/foodorderingsystem-3e400.appspot.com/o/marker.svg?alt=media&token=09d05df3-5ad9-4f40-b130-f961683ad247",scaledSize:{width:200,height:100}}}}ngOnInit(){this.driveForm=new o.e({first_name:new o.b(null,o.u.required),last_name:new o.b(null,o.u.required),email:new o.b(null,o.u.required),mobileNumber:new o.b(null,o.u.required)}),localStorage.setItem("Location",JSON.stringify(this.Location)),navigator.geolocation||console.log("location not found"),navigator.geolocation.getCurrentPosition(e=>{this.Location.lat=e.coords.latitude,this.Location.lng=e.coords.longitude,console.log(this.Location),localStorage.setItem("Location",JSON.stringify(this.Location)),this.Location=JSON.parse(localStorage.getItem("Location")||"[]"),this.lat=this.Location.lat,this.lng=this.Location.lng}),this.Location=JSON.parse(localStorage.getItem("Location")||"[]"),0==this.Location.lat&&0==this.Location.lng&&(this.Location.lat=21.27,this.Location.lng=72.958,this.lat=this.Location.lat,this.lng=this.Location.lng),localStorage.setItem("Location",JSON.stringify(this.Location)),this.header.slider().subscribe(e=>{this.slider=e.data,console.log(this.slider),this.display.push(this.slider[0])})}DriverReq(){console.log(typeof this.driveForm.value),this.header.driverReq(this.driveForm.value).subscribe(e=>{console.log(e),console.log("submit Succussfully")})}bookRepair(){this.modalService.open(l.a)}call(){this.modalService.open(l.a),this.router.navigate([""])}OnChange(e){this.display.pop(),console.log(e),this.display.push(e)}}return e.\u0275fac=function(t){return new(t||e)(r["\u0275\u0275directiveInject"](m.b),r["\u0275\u0275directiveInject"](d.a),r["\u0275\u0275directiveInject"](a.b))},e.\u0275cmp=r["\u0275\u0275defineComponent"]({type:e,selectors:[["app-home-page"]],decls:219,vars:2,consts:[[1,"ano-banner"],["class","home-banner",3,"style",4,"ngFor","ngForOf"],[1,"container"],[1,"extra-detail","padding"],[1,"howitwork","padding"],[1,"howitwork-title"],[1,"servicelist"],[1,"service-detail"],[1,"service-detail-img"],["src","./../../assets/images/select device.svg","alt","",1,"img-fluid"],["src","../../assets/images/repair.svg","alt","",1,"img-fluid"],["src","../../assets/images/getback.svg","alt","",1,"img-fluid"],[1,"whyus","padding"],[1,"whyus-title"],[1,"whyuslist"],[1,"listdisplay"],[1,"whyus-detail"],[1,"whyimg"],["src","../../assets/images/whyus1.svg","alt","",2,"margin","0 10px 15px 10px"],["src","../../assets/images/Line1.svg","alt","",1,"desktop"],[1,"whyuslist-detailll"],["src","../../assets/images/whyus2.svg","alt","",2,"margin","0 10px 15px 10px"],["src","../../assets/images/Line2.svg","alt","",1,"desktop"],["src","../../assets/images/whyus3.svg","alt","",2,"margin","0 10px 15px 10px"],["src","../../assets/images/Line3.svg","alt","",1,"desktop"],["src","../../assets/images/whyus4.svg","alt","",2,"margin","0 0 15px 0"],[1,"aboutus"],[1,"row"],[1,"aboutdetail","col-md-6"],[1,"about-title"],[1,"about-img","col-md-6"],[1,"about-img-12"],["src","../../assets/images/about/Image 1.png","alt","",1,"img-fluid","about-img-1","anim_three"],["src","../../assets/images/about/Image 2.png","alt","",1,"img-fluid","about-img-2","anim_four"],[1,"about-img-34"],["src","../../assets/images/about/Image 3.png","alt","",1,"img-fluid","about-img-3","anim_four"],["src","../../assets/images/about/Image 4.png","alt","",1,"img-fluid","about-img-4","anim_seven"],[1,"signup-driver","driver-bg",2,"background","url(../../assets/images/stearing\\ wheel.svg)"],[1,"driverdetail","col-md-6"],[1,"driver-title"],[1,"requestform","col-md-6"],[3,"formGroup"],[1,"name"],["type","text","formControlName","first_name","name","first","id","first","placeholder","First Name"],["type","text","formControlName","last_name","name","last","id","last","placeholder","Last Name"],[1,"contact"],["type","text","formControlName","email","name","email","id","email","placeholder","Email"],["type","text","maxlength","10","formControlName","mobileNumber","name","mobile","id","mobile","placeholder","Mobile No"],[1,"req-btn"],[3,"click"],[1,"client"],[1,"client-title"],[1,"client-review"],[1,"col-md-4"],[1,"review"],[1,"review-blog"],[1,"reviewer"],["src","../../assets/images/client.svg","alt",""],[1,"count"],[1,"count-head"],[1,"counts"],[1,"hexagon"],[1,"hexagonetext"],[1,"service"],[1,"col-md-6"],[1,"experience-detail"],[1,"store"],["src","../../assets/images/Google Play Badge.svg","alt",""],["src","../../assets/images/App Store Badge.svg","alt",""],[1,"col-md-3"],[1,"experience-img1"],["src","../../assets/images/Screen1.svg","alt","",1,"img-fluid"],[1,"experience-img2"],["src","../../assets/images/Screen2.svg","alt","",1,"img-fluid"],[1,"home-banner"],[1,"col-md-5"],[1,"col-md-7"],[1,"banner-detail"],[2,"padding-top","9px"],[1,"select-dervice-car"],[3,"height","cellWidth","arrowsOutside"],["class","carousel-cell service-box",3,"click",4,"ngFor","ngForOf"],[1,"carousel-cell","service-box",3,"click"],["alt","hey",3,"src"]],template:function(e,t){1&e&&(r["\u0275\u0275elementStart"](0,"section",0),r["\u0275\u0275template"](1,g,13,9,"div",1),r["\u0275\u0275elementStart"](2,"div",2),r["\u0275\u0275elementStart"](3,"div",3),r["\u0275\u0275elementStart"](4,"h3"),r["\u0275\u0275text"](5,'"'),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](6,"p"),r["\u0275\u0275text"](7,"Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](8,"div",4),r["\u0275\u0275elementStart"](9,"div",5),r["\u0275\u0275elementStart"](10,"h3"),r["\u0275\u0275text"](11,"How it works"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](12,"div",6),r["\u0275\u0275elementStart"](13,"div",7),r["\u0275\u0275elementStart"](14,"div",8),r["\u0275\u0275element"](15,"img",9),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](16,"h4"),r["\u0275\u0275text"](17,"Select Device"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](18,"p"),r["\u0275\u0275text"](19,"Create an account to get started."),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](20,"div",7),r["\u0275\u0275elementStart"](21,"div",8),r["\u0275\u0275element"](22,"img",10),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](23,"h4"),r["\u0275\u0275text"](24,"Schedule Repair"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](25,"p"),r["\u0275\u0275text"](26,"Add contents and pages to your site."),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](27,"div",7),r["\u0275\u0275elementStart"](28,"div",8),r["\u0275\u0275element"](29,"img",11),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](30,"h4"),r["\u0275\u0275text"](31,"Get Back"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](32,"p"),r["\u0275\u0275text"](33,"Now publish to make your site live!"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](34,"div",12),r["\u0275\u0275elementStart"](35,"div",13),r["\u0275\u0275elementStart"](36,"h3"),r["\u0275\u0275text"](37,"Why Us"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](38,"div",14),r["\u0275\u0275elementStart"](39,"div",15),r["\u0275\u0275elementStart"](40,"div",16),r["\u0275\u0275elementStart"](41,"div",17),r["\u0275\u0275element"](42,"img",18),r["\u0275\u0275element"](43,"img",19),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](44,"div",20),r["\u0275\u0275elementStart"](45,"h4"),r["\u0275\u0275text"](46,"One-stop Solution"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](47,"p"),r["\u0275\u0275text"](48,"Sell, buy, repair or accessorize your smartphone"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](49,"div",16),r["\u0275\u0275elementStart"](50,"div",17),r["\u0275\u0275element"](51,"img",21),r["\u0275\u0275element"](52,"img",22),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](53,"div",20),r["\u0275\u0275elementStart"](54,"h4"),r["\u0275\u0275text"](55,"Quick & Hassle-free"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](56,"p"),r["\u0275\u0275text"](57,"Get mobile care in a click at your home or office"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](58,"div",15),r["\u0275\u0275elementStart"](59,"div",16),r["\u0275\u0275elementStart"](60,"div",17),r["\u0275\u0275element"](61,"img",23),r["\u0275\u0275element"](62,"img",24),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](63,"div",20),r["\u0275\u0275elementStart"](64,"h4"),r["\u0275\u0275text"](65,"Amazing Prices"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](66,"p"),r["\u0275\u0275text"](67,"You\u2019ll surely love our prices"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](68,"div",16),r["\u0275\u0275elementStart"](69,"div",17),r["\u0275\u0275element"](70,"img",25),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](71,"div",20),r["\u0275\u0275elementStart"](72,"h4"),r["\u0275\u0275text"](73,"Guaranteed Safety"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](74,"p"),r["\u0275\u0275text"](75,"We are the safest hands for your device security"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](76,"div",26),r["\u0275\u0275elementStart"](77,"div",27),r["\u0275\u0275elementStart"](78,"div",28),r["\u0275\u0275elementStart"](79,"div",29),r["\u0275\u0275elementStart"](80,"h3"),r["\u0275\u0275text"](81,"About Us"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](82,"p"),r["\u0275\u0275text"](83,"Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](84,"p"),r["\u0275\u0275text"](85,"Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](86,"span"),r["\u0275\u0275text"](87,"Read More >>"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](88,"div",30),r["\u0275\u0275elementStart"](89,"div",31),r["\u0275\u0275element"](90,"img",32),r["\u0275\u0275element"](91,"img",33),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](92,"div",34),r["\u0275\u0275element"](93,"img",35),r["\u0275\u0275element"](94,"img",36),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](95,"div",37),r["\u0275\u0275elementStart"](96,"div",2),r["\u0275\u0275elementStart"](97,"div",27),r["\u0275\u0275elementStart"](98,"div",38),r["\u0275\u0275elementStart"](99,"div",39),r["\u0275\u0275elementStart"](100,"h3"),r["\u0275\u0275text"](101,"Signup As a Driver"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](102,"p"),r["\u0275\u0275text"](103,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc odio in et, lectus sit lorem id integer. "),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](104,"div",40),r["\u0275\u0275elementStart"](105,"form",41),r["\u0275\u0275elementStart"](106,"div",42),r["\u0275\u0275element"](107,"input",43),r["\u0275\u0275element"](108,"input",44),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](109,"div",45),r["\u0275\u0275element"](110,"input",46),r["\u0275\u0275element"](111,"input",47),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](112,"div",48),r["\u0275\u0275elementStart"](113,"button",49),r["\u0275\u0275listener"]("click",function(){return t.DriverReq()}),r["\u0275\u0275text"](114,"Request"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](115,"div",50),r["\u0275\u0275elementStart"](116,"div",2),r["\u0275\u0275elementStart"](117,"div",51),r["\u0275\u0275elementStart"](118,"h3"),r["\u0275\u0275text"](119,"Our Clients Speak"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](120,"p"),r["\u0275\u0275text"](121,"We have been working with clients around the world"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](122,"div",52),r["\u0275\u0275elementStart"](123,"div",27),r["\u0275\u0275elementStart"](124,"div",53),r["\u0275\u0275elementStart"](125,"div",54),r["\u0275\u0275elementStart"](126,"div",55),r["\u0275\u0275elementStart"](127,"h4"),r["\u0275\u0275text"](128,"Efficient Collaborating"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](129,"p"),r["\u0275\u0275text"](130,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem."),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](131,"div",56),r["\u0275\u0275element"](132,"img",57),r["\u0275\u0275elementStart"](133,"h5"),r["\u0275\u0275text"](134,"Jane Cooper"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](135,"p"),r["\u0275\u0275text"](136,"CEO at ABC Corporation"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](137,"div",53),r["\u0275\u0275elementStart"](138,"div",54),r["\u0275\u0275elementStart"](139,"div",55),r["\u0275\u0275elementStart"](140,"h4"),r["\u0275\u0275text"](141,"Efficient Collaborating"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](142,"p"),r["\u0275\u0275text"](143,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem."),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](144,"div",56),r["\u0275\u0275element"](145,"img",57),r["\u0275\u0275elementStart"](146,"h5"),r["\u0275\u0275text"](147,"Jane Cooper"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](148,"p"),r["\u0275\u0275text"](149,"CEO at ABC Corporation"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](150,"div",53),r["\u0275\u0275elementStart"](151,"div",54),r["\u0275\u0275elementStart"](152,"div",55),r["\u0275\u0275elementStart"](153,"h4"),r["\u0275\u0275text"](154,"Efficient Collaborating"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](155,"p"),r["\u0275\u0275text"](156,"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem."),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](157,"div",56),r["\u0275\u0275element"](158,"img",57),r["\u0275\u0275elementStart"](159,"h5"),r["\u0275\u0275text"](160,"Jane Cooper"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](161,"p"),r["\u0275\u0275text"](162,"CEO at ABC Corporation"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](163,"div",58),r["\u0275\u0275elementStart"](164,"div",2),r["\u0275\u0275elementStart"](165,"div",59),r["\u0275\u0275elementStart"](166,"h3"),r["\u0275\u0275text"](167,"Some count that matters"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](168,"h5"),r["\u0275\u0275text"](169,"US First and Largest Online Mobile Expert"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](170,"div",60),r["\u0275\u0275elementStart"](171,"div",15),r["\u0275\u0275elementStart"](172,"div",61),r["\u0275\u0275elementStart"](173,"div",62),r["\u0275\u0275elementStart"](174,"h3"),r["\u0275\u0275text"](175,"600+"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](176,"h4"),r["\u0275\u0275text"](177,"Happy Users"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](178,"div",61),r["\u0275\u0275elementStart"](179,"div",62),r["\u0275\u0275elementStart"](180,"h3"),r["\u0275\u0275text"](181,"540+"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](182,"h4"),r["\u0275\u0275text"](183,"Devices repaired"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](184,"div",15),r["\u0275\u0275elementStart"](185,"div",61),r["\u0275\u0275elementStart"](186,"div",62),r["\u0275\u0275elementStart"](187,"h3"),r["\u0275\u0275text"](188,"500"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](189,"h4"),r["\u0275\u0275text"](190,"Dedicated Vendors"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](191,"div",61),r["\u0275\u0275elementStart"](192,"div",62),r["\u0275\u0275elementStart"](193,"h3"),r["\u0275\u0275text"](194,"4.6+"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](195,"h4"),r["\u0275\u0275text"](196,"User rating"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](197,"div",63),r["\u0275\u0275elementStart"](198,"div",2),r["\u0275\u0275elementStart"](199,"div",27),r["\u0275\u0275elementStart"](200,"div",64),r["\u0275\u0275elementStart"](201,"div",65),r["\u0275\u0275elementStart"](202,"h3"),r["\u0275\u0275text"](203,"Get Service from your mobile"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](204,"p"),r["\u0275\u0275text"](205,"Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](206,"h4"),r["\u0275\u0275text"](207,"Get the App"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](208,"div",66),r["\u0275\u0275elementStart"](209,"button"),r["\u0275\u0275element"](210,"img",67),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](211,"button"),r["\u0275\u0275element"](212,"img",68),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](213,"div",69),r["\u0275\u0275elementStart"](214,"div",70),r["\u0275\u0275element"](215,"img",71),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](216,"div",69),r["\u0275\u0275elementStart"](217,"div",72),r["\u0275\u0275element"](218,"img",73),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"]()),2&e&&(r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngForOf",t.display),r["\u0275\u0275advance"](104),r["\u0275\u0275property"]("formGroup",t.driveForm))},directives:[i.k,o.v,o.l,o.f,o.a,o.k,o.d,o.h,s.a],styles:[".ano-banner[_ngcontent-%COMP%]{background-color:#fff}.padding[_ngcontent-%COMP%]{padding:25px 0}h2[_ngcontent-%COMP%]{font-family:Poppins-SemiBold;font-size:72px;max-width:498px;color:#fff;padding-top:25px;margin-bottom:0}.banner-detail[_ngcontent-%COMP%]{display:grid;margin-bottom:30px}.banner-detail[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:15px;font-family:Poppins-regular;max-width:600px;padding-top:25px;margin-top:-25px;margin-bottom:-3px}.repair-btn[_ngcontent-%COMP%]{width:20%!important;font-family:Poppins-SemiBold;color:#000}.banner-service[_ngcontent-%COMP%]{display:flex;width:100%;overflow-x:scroll;overflow-y:hidden;scroll-behavior:smooth;-ms-overflow-style:none;scrollbar-width:none}.banner-service[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}.service-box[_ngcontent-%COMP%]{padding:10px}.service-box[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:150px!important;width:auto!important;border-radius:5px!important;box-shadow:0 0 3px #e9e9e9}.service-box[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:20px;text-align:center;position:relative;bottom:60%;color:#fff}.extra-detail[_ngcontent-%COMP%]{display:grid}.extra-detail[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin-bottom:0;text-align:center;color:#2ec5ce;font-family:Poppins-SemiBold;font-weight:bolder;font-size:40px}.extra-detail[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{text-align:center;font-family:Poppins-regular;font-size:15px}.howitwork[_ngcontent-%COMP%], .whyus[_ngcontent-%COMP%]{width:100%}.about-title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .count-head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .howitwork-title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .whyus-title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:40px;font-family:Poppins-SemiBold;margin-bottom:30px}.about-title[_ngcontent-%COMP%]{margin-top:50px}.servicelist[_ngcontent-%COMP%]{justify-content:space-between}.listdisplay[_ngcontent-%COMP%], .servicelist[_ngcontent-%COMP%], .whyuslist[_ngcontent-%COMP%]{display:flex;align-items:center}.listdisplay[_ngcontent-%COMP%]{justify-content:space-between;width:100%}.whyuslist-detailll[_ngcontent-%COMP%]{height:100px}.service-detail[_ngcontent-%COMP%], .whyus-detail[_ngcontent-%COMP%]{display:grid;text-align:center}.service-detail[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:24px;font-family:Poppins-Medium}.whyus-detail[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:18px;font-family:Poppins-SemiBold}.service-detail[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .whyus-detail[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:15px;font-family:Poppins-regular}.whyus-detail[_ngcontent-%COMP%]{text-align:left!important;margin-right:10px}.service-detail[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:100%;width:100%}.whyimg[_ngcontent-%COMP%]{display:flex;height:100px}.aboutus[_ngcontent-%COMP%]{margin-top:50px;margin-bottom:50px}.aboutdetail[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-family:Poppins-regular;font-size:15px}.aboutdetail[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#ffc542}.about-img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:70%;display:flex;float:right}.signup-driver[_ngcontent-%COMP%]{background-color:#fffff5!important;padding-top:10px;padding-bottom:80px}.driver-bg[_ngcontent-%COMP%]{background-repeat:no-repeat!important}.driver-title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:60px;font-family:Poppins-SemiBold;margin-bottom:30px}.client-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .driver-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .service[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .service[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:15px;font-family:Poppins-Regular}.requestform[_ngcontent-%COMP%]{padding-top:25px;width:100%}.requestform[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{background-color:#18191f;color:#fff;border:none;border-radius:5px;padding:10px;font-family:Poppins-SemiBold;width:120px}.requestform[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{background-color:#fffff5;border:none;border-bottom:1px solid #ccccc4;font-family:Poppins-Regular}.contact[_ngcontent-%COMP%], .name[_ngcontent-%COMP%]{display:flex;width:100%;justify-content:space-evenly;padding:10px 0}.req-btn[_ngcontent-%COMP%]{display:flex;width:100%;justify-content:center;padding-top:25px}.client[_ngcontent-%COMP%]{background-color:#f9f9fa;padding-top:30px;padding-bottom:30px}.client-title[_ngcontent-%COMP%]{text-align:center}.review[_ngcontent-%COMP%]{background-image:url(Card.07df83d12cf0aa985613.svg);background-repeat:no-repeat;background-size:contain;height:auto;display:grid}.review-blog[_ngcontent-%COMP%]{max-width:300px;margin:auto;padding:20px 10px 10px;text-align:center}.review-blog[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:20px;font-family:Poppins-SemiBold}.review-blog[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-family:Poppins-Regular;font-size:15px}.client-title[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .service[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:40px;font-family:Poppins-SemiBold}.store[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:none;background:transparent;margin-right:10px}.reviewer[_ngcontent-%COMP%]{display:grid;justify-content:center;text-align:-webkit-center;margin-top:10px}.reviewer[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-size:20px;font-family:Poppins-SemiBold;margin-bottom:0}.reviewer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:15px}.count-head[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%], .reviewer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-family:Poppins-Regular}.count-head[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-size:18px}.count[_ngcontent-%COMP%]{margin-top:50px;margin-bottom:50px}.count-head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin-bottom:0}.counts[_ngcontent-%COMP%]{display:flex;width:100%}.hexagon[_ngcontent-%COMP%]{background-image:url(Polygon.781bdc22bc0bd3159159.svg);width:100%;height:280px;background-repeat:no-repeat}.hexagonetext[_ngcontent-%COMP%]{position:relative;top:98px;text-align:center}.hexagonetext[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:30px;font-family:Poppins-SemiBold}.hexagonetext[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:18px;font-family:Poppins-Regular}.service[_ngcontent-%COMP%]{background-color:#ffefcf;padding-top:30px;padding-bottom:30px}.experience-img1[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{position:relative;top:-30px}.experience-img2[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{position:relative;top:30px}.store[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-right:10px}carousel.carousel[_ngcontent-%COMP%]{z-index:0}.service-detail-img[_ngcontent-%COMP%]{height:180px;width:auto;margin-bottom:20px}.service-detail[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{max-width:150px;margin:auto}.about-img-12[_ngcontent-%COMP%]{display:flex}.about-img-12[_ngcontent-%COMP%]   .about-img-1[_ngcontent-%COMP%]{height:250px;width:auto;margin-right:20px}.about-img-12[_ngcontent-%COMP%]   .about-img-2[_ngcontent-%COMP%]{height:210px;width:auto;margin-top:40px}.about-img-34[_ngcontent-%COMP%]   .about-img-3[_ngcontent-%COMP%]{height:180px;width:auto;margin-right:20px}.about-img-34[_ngcontent-%COMP%]{margin-top:20px}.about-img-34[_ngcontent-%COMP%]   .about-img-4[_ngcontent-%COMP%]{height:290px;width:auto;margin-right:20px}.about-img-34[_ngcontent-%COMP%]{display:flex}.home-banner[_ngcontent-%COMP%]{width:100%;padding-top:60px;background-repeat:no-repeat;background-size:cover;background-position:50%}.home-banner[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]{margin-right:0}.select-dervice-car[_ngcontent-%COMP%]{width:80%;position:relative;right:-15%;cursor:pointer!important}.banner-detail[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .banner-detail[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{width:100%;color:#fff;transform:translateY(-50px)}.banner-detail[_ngcontent-%COMP%]   div[_ngcontent-%COMP%], .banner-detail[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .banner-detail[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{float:left;opacity:0;animation-name:titleAnimation;animation-timing-function:ease;animation-duration:3s}.banner-detail[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{animation-delay:.6s;-webkit-animation-fill-mode:forwards}.banner-detail[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{animation-delay:.9s;-webkit-animation-fill-mode:forwards}.banner-detail[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{animation-delay:1.4s;-webkit-animation-fill-mode:forwards}@keyframes titleAnimation{0%{transform:translateY(-50px);opacity:0;-webkit-clip-path:polygon(100% 0,100% 100%,0 100%,0 80%);clip-path:polygon(100% 0,100% 100%,0 100%,0 80%)}20%{transform:translateY(0);opacity:1;-webkit-clip-path:polygon(100% 0,100% 100%,0 100%,0 15%);clip-path:polygon(100% 0,100% 100%,0 100%,0 15%)}80%{transform:translateY(0);opacity:1;-webkit-clip-path:polygon(100% 0,100% 100%,0 100%,0 15%);clip-path:polygon(100% 0,100% 100%,0 100%,0 15%)}to{transform:translateY(0);opacity:1;-webkit-clip-path:polygon(100% 0,100% 100%,0 100%,0 15%);clip-path:polygon(100% 0,100% 100%,0 100%,0 15%)}}.anim_one[_ngcontent-%COMP%]{animation:pulse 1s linear infinite alternate}.anim_three[_ngcontent-%COMP%]{animation:updown 5s linear infinite}.anim_four[_ngcontent-%COMP%]{animation:leftright 5s linear infinite}.anim_seven[_ngcontent-%COMP%]{animation:fltleftright 3s linear infinite}@keyframes pulse{to{transform:scale(1.3)}}@keyframes rotate{0%{transform:translatez(0) rotate(0)}to{transform:translatez(0) rotate(1turn)}}@keyframes updown{0%,to{transform:translateY(-40px)}50%{transform:translateY(-10px)}}@keyframes leftright{0%,to{transform:translateX(-50px)}50%{transform:translateX(-10px)}}@keyframes anim_five{0%{transform:translate(0) rotate(0deg)}20%{transform:translate(73px,-1px) rotate(36deg)}40%{transform:translate(141px,-20px) rotate(72deg)}60%{transform:translate(83px,-60px) rotate(108deg)}80%{transform:translate(-40px,72px) rotate(144deg)}to{transform:translate(0) rotate(0deg)}}@keyframes fltmovetwo{0%{transform:translate(0) rotate(0deg)}21%{transform:translate(4px,-20px) rotate(38deg)}41%{transform:translate(-50px,-60px) rotate(74deg)}60%{transform:translate(-20px,-30px) rotate(108deg)}80%{transform:translate(-195px,-49px) rotate(144deg)}to{transform:translate(-1px) rotate(180deg)}}@keyframes fltleftright{0%{transform:translate(0) rotate(0deg)}50%{transform:translate(10px,-5px) rotate(0deg)}to{transform:translate(0) rotate(0deg)}}@media only screen and (max-width:991px){.listdisplay[_ngcontent-%COMP%]{display:grid}.whyus-detail[_ngcontent-%COMP%]{text-align:center!important}.whyimg[_ngcontent-%COMP%]{justify-content:center}.hexagon[_ngcontent-%COMP%]{width:165%!important}}@media only screen and (max-width:768px){.banner-detail[_ngcontent-%COMP%]{margin-left:20px}.about-img.col-md-6[_ngcontent-%COMP%]{display:grid;justify-content:end;margin-top:40px}}@media only screen and (max-width:1200px){.select-dervice-car[_ngcontent-%COMP%]{position:inherit!important;margin:auto}}"]}),e})()}];let u=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=r["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=r["\u0275\u0275defineInjector"]({imports:[[a.c.forChild(p)],a.c]}),e})();var h=n("+Z6e");let f=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=r["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=r["\u0275\u0275defineInjector"]({imports:[[i.b,u,h.a]]}),e})()}}]);