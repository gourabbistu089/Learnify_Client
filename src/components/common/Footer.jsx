import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";

// Images
import Logo from "../../assets/Logo/Logo-Full-Light.png";

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="bg-richblack-800">
      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
        <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700">
          {/* Section 1 */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3">
            <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
                    <div className=" -ml-11">
                       <svg width="239.2" height="57.32756756756756" viewBox="0 0 370 136" class="looka-1j8o68f"><defs id="SvgjsDefs7587"><linearGradient id="SvgjsLinearGradient7596"><stop id="SvgjsStop7597" stop-color="#905e26" offset="0"></stop><stop id="SvgjsStop7598" stop-color="#f5ec9b" offset="0.5"></stop><stop id="SvgjsStop7599" stop-color="#905e26" offset="1"></stop></linearGradient><linearGradient id="SvgjsLinearGradient7600"><stop id="SvgjsStop7601" stop-color="#905e26" offset="0"></stop><stop id="SvgjsStop7602" stop-color="#f5ec9b" offset="0.5"></stop><stop id="SvgjsStop7603" stop-color="#905e26" offset="1"></stop></linearGradient><linearGradient id="SvgjsLinearGradient7604"><stop id="SvgjsStop7605" stop-color="#905e26" offset="0"></stop><stop id="SvgjsStop7606" stop-color="#f5ec9b" offset="0.5"></stop><stop id="SvgjsStop7607" stop-color="#905e26" offset="1"></stop></linearGradient><linearGradient id="SvgjsLinearGradient7608"><stop id="SvgjsStop7609" stop-color="#905e26" offset="0"></stop><stop id="SvgjsStop7610" stop-color="#f5ec9b" offset="0.5"></stop><stop id="SvgjsStop7611" stop-color="#905e26" offset="1"></stop></linearGradient></defs><g id="SvgjsG7588" featurekey="rootContainer" transform="matrix(1,0,0,1,0,0)" fill="url(#SvgjsLinearGradient7596)"><rect y="0" height="1" width="1" opacity="0"></rect><rect y="131" width="370" height="5"></rect></g><g id="SvgjsG7589" featurekey="symbolFeature-0" transform="matrix(1.2220456771644572,0,0,1.2220456771644572,-4.992056637834151,14.00794336216585)" fill="url(#SvgjsLinearGradient7600)"><g xmlns="http://www.w3.org/2000/svg"><circle fill="url(#SvgjsLinearGradient7600)" cx="45" cy="44.404" r="4.621"></circle><g><path fill="url(#SvgjsLinearGradient7600)" d="M31.56,35.003c2.132,2.208,4.766,3.639,7.549,4.287c-0.549-2.804-1.886-5.487-4.018-7.695    c-2.132-2.209-4.766-3.639-7.549-4.288C28.091,30.11,29.428,32.794,31.56,35.003z"></path><path fill="url(#SvgjsLinearGradient7600)" d="M35.003,58.439c2.208-2.131,3.639-4.766,4.287-7.549c-2.803,0.55-5.486,1.888-7.695,4.019    c-2.208,2.133-3.64,4.767-4.288,7.55C30.11,61.908,32.793,60.572,35.003,58.439z"></path><path fill="url(#SvgjsLinearGradient7600)" d="M58.44,54.998c-2.133-2.209-4.767-3.64-7.55-4.287c0.549,2.804,1.887,5.487,4.019,7.694    c2.132,2.209,4.767,3.64,7.549,4.288C61.908,59.89,60.57,57.206,58.44,54.998z"></path><path fill="url(#SvgjsLinearGradient7600)" d="M54.999,31.561c-2.21,2.132-3.641,4.766-4.288,7.549c2.803-0.551,5.486-1.886,7.694-4.019    c2.21-2.132,3.641-4.766,4.288-7.548C59.89,28.091,57.206,29.429,54.999,31.561z"></path></g><g><path fill="url(#SvgjsLinearGradient7600)" d="M45,4.085c-20.801,27.626,0,27.927,0,27.927S65.801,31.712,45,4.085z"></path><path fill="url(#SvgjsLinearGradient7600)" d="M45,85.914c20.8-27.625,0-27.926,0-27.926S24.199,58.289,45,85.914z"></path></g><g><path fill="url(#SvgjsLinearGradient7600)" d="M4.085,45c27.626,20.801,27.927,0,27.927,0S31.711,24.199,4.085,45z"></path><path fill="url(#SvgjsLinearGradient7600)" d="M85.915,45c-27.626-20.801-27.927,0-27.927,0S58.289,65.802,85.915,45z"></path></g></g></g><g id="SvgjsG7590" featurekey="nameFeature-0" transform="matrix(2.0712509570717943,0,0,2.0712509570717943,115.8574980858564,2.1756419768639095)" fill="url(#SvgjsLinearGradient7604)"><path d="M2 40 l0 -32 l4 0 l0 28 l5.2 0 l0 4 l-9.2 0 z M16.1 40 l0 -32 l9.2 0 l0 3.2 l-5.2 0 l0 10.4 l4.4 0 l0 3.2 l-4.4 0 l0 11.2 l5.2 0 l0 4 l-9.2 0 z M30.6 40 l0 -16.8 c0 -11.16 0 -15.56 6 -15.56 s6 4.4 6 15.56 l0 16.8 l-4 0 l0 -9.2 l-4 0 l0 9.2 l-4 0 z M34.6 27.6 l4 0 l0 -4.4 c0 -10.4 0 -12.36 -2 -12.36 s-2 1.96 -2 12.36 l0 4.4 z M49.1 40 l0 -32 l6.48 0 c4.12 0 5.52 2.52 5.52 7.36 c0 4.36 -0.52 6.84 -1.76 8.04 l0 0.24 c1.04 0.36 1.36 2.24 1.76 6.92 l0.8 9.44 l-4 0 l-0.52 -9.44 c-0.28 -4.76 -1 -5.76 -2.2 -5.76 l-2.08 0 l0 15.2 l-4 0 z M53.1 21.6 l2.48 0 c1.4 0 1.8 -1.4 1.8 -6.24 c0 -3.16 -0.6 -4.16 -1.8 -4.16 l-2.48 0 l0 10.4 z M67.6 40 l0 -32 l3.6 0 l5.24 19.6 l-0.04 -0.4 l0 -19.2 l4 0 l0 32 l-3.6 0 l-5.24 -17.6 l0.04 0.4 l0 17.2 l-4 0 z M86.89999999999999 40 l0 -32 l4 0 l0 32 l-4 0 z M97.39999999999999 40 l0 -32 l8.4 0 l0 3.2 l-4.4 0 l0 12 l3.6 0 l0 3.2 l-3.6 0 l0 13.6 l-4 0 z M109.5 8 l4 0 l2.4 12.32 l0.4 0 l2.4 -12.32 l4 0 l-4.6 18.08 l0 13.92 l-4 0 l0 -13.92 z"></path></g><g id="SvgjsG7591" featurekey="sloganFeature-0" transform="matrix(1.0284891946331371,0,0,1.0284891946331371,117.38763748486558,98.86000358596468)" fill="url(#SvgjsLinearGradient7608)"><path d="M2.54 18.76 l0 -10.76 c0 -0.42 0.32 -0.64 0.64 -0.64 s0.66 0.22 0.66 0.64 l0 10.06 l3.98 0 c0.44 0 0.68 0.34 0.68 0.68 s-0.24 0.66 -0.68 0.66 l-4.62 0 c-0.4 0 -0.66 -0.32 -0.66 -0.64 z M12.42 18.7 l0 -10.64 c0 -0.46 0.36 -0.7 0.7 -0.7 l4.6 0 c0.44 0 0.66 0.32 0.66 0.66 s-0.22 0.68 -0.66 0.68 l-3.96 0 l0 3.88 l3.14 0 c0.46 0 0.68 0.32 0.68 0.66 s-0.24 0.7 -0.68 0.7 l-3.14 0 l0 4.14 l3.96 0 c0.42 0 0.64 0.34 0.64 0.66 c0 0.34 -0.22 0.66 -0.64 0.66 l-4.6 0 c-0.34 0 -0.7 -0.12 -0.7 -0.7 z M22.619999999999997 7.359999999999999 l6.04 0 c0.42 0 0.62 0.34 0.62 0.68 s-0.2 0.66 -0.62 0.66 l-2.28 0 l0 10.06 c0 0.42 -0.34 0.64 -0.68 0.64 s-0.66 -0.22 -0.66 -0.64 l0 -10.06 l-2.42 0 c-0.42 0 -0.62 -0.32 -0.62 -0.66 s0.2 -0.68 0.62 -0.68 z M34.199999999999996 6.66 l0 0.84 c0 0.92 -1.32 0.9 -1.32 0 l0 -0.84 c0 -0.94 1.32 -0.9 1.32 0 z M37.779999999999994 17.68 c-0.44 -0.82 0.68 -1.42 1.2 -0.6 c0.26 0.42 1.04 1.14 2.28 1.14 c0.52 0 1.82 -0.38 2 -1.86 c0.12 -0.9 -0.74 -1.78 -2.22 -2.52 c-2.08 -0.98 -3.66 -1.84 -3.66 -3.56 c0 -2.04 1.72 -3 3.56 -3 c1.66 0 2.58 1.02 2.9 1.54 c0.46 0.74 -0.54 1.46 -1.1 0.74 c-0.28 -0.36 -0.82 -0.96 -1.8 -0.96 c-1.1 0 -2.24 0.52 -2.24 1.68 c0 0.92 1.02 1.44 2.54 2.16 c1.78 0.88 3.64 1.74 3.36 4.08 c-0.22 1.84 -1.62 3.02 -3.34 3.02 c-1.3 0 -2.9 -0.7 -3.48 -1.86 z M56.54 18.76 l0 -10.76 c0 -0.48 0.38 -0.64 0.66 -0.64 l4.6 0 c0.44 0 0.66 0.32 0.66 0.66 s-0.22 0.68 -0.66 0.68 l-3.94 0 l0 3.88 l3.14 0 c0.44 0 0.68 0.34 0.68 0.68 s-0.24 0.68 -0.68 0.68 l-3.14 0 l0 4.82 c0 0.42 -0.34 0.64 -0.66 0.64 c-0.34 0 -0.66 -0.22 -0.66 -0.64 z M66.48 18.78 l0 -10.78 c0 -0.42 0.32 -0.64 0.64 -0.64 s0.66 0.22 0.66 0.64 l0 10.78 c0 0.86 -1.3 0.86 -1.3 0 z M74.11999999999999 15.9 l0 2.86 c0 0.44 -0.34 0.64 -0.66 0.64 c-0.34 0 -0.66 -0.2 -0.66 -0.64 l0 -10.74 c0 -0.4 0.22 -0.66 0.66 -0.66 l2.7 0 c0.76 0 3.16 0.22 3.16 2.92 l0 2.5 c0 1.52 -0.56 2.48 -1.84 2.9 l1.36 2.74 c0.28 0.54 -0.14 0.98 -0.58 0.98 c-0.24 0 -0.54 -0.16 -0.7 -0.5 l-1.46 -3 l-1.98 0 z M78 12.780000000000001 l0 -2.5 c0 -0.48 -0.18 -1.58 -1.84 -1.58 l-2.04 0 l0 5.86 l1.86 0 c0.98 0 2.02 -0.22 2.02 -1.78 z M84.14 18.7 l0 -10.64 c0 -0.46 0.36 -0.7 0.7 -0.7 l4.6 0 c0.44 0 0.66 0.32 0.66 0.66 s-0.22 0.68 -0.66 0.68 l-3.96 0 l0 3.88 l3.14 0 c0.46 0 0.68 0.32 0.68 0.66 s-0.24 0.7 -0.68 0.7 l-3.14 0 l0 4.14 l3.96 0 c0.42 0 0.64 0.34 0.64 0.66 c0 0.34 -0.22 0.66 -0.64 0.66 l-4.6 0 c-0.34 0 -0.7 -0.12 -0.7 -0.7 z M101.98 15.86 l0 -4.96 c0 -2.4 1.24 -3.68 3.64 -3.68 l0.52 0 c2.38 0 3.64 1.28 3.64 3.68 l0 4.96 c0 2.2 -1.46 3.64 -3.64 3.64 l-0.52 0 c-2.22 0 -3.64 -1.46 -3.64 -3.64 z M105.62 18.16 l0.52 0 c1.44 0 2.3 -0.9 2.3 -2.3 l0 -4.96 c0 -1.56 -0.76 -2.36 -2.3 -2.36 l-0.52 0 c-1.52 0 -2.36 0.82 -2.36 2.36 l0 4.96 c0 1.46 0.92 2.3 2.36 2.3 z M121.36000000000001 8 l0 10.76 c0 0.42 -0.32 0.64 -0.64 0.64 c-0.24 0 -0.56 -0.18 -0.7 -0.44 c-1.5 -2.94 -2.62 -5.2 -4.12 -8.16 l0 7.96 c0 0.42 -0.32 0.64 -0.66 0.64 c-0.32 0 -0.66 -0.22 -0.66 -0.64 l0 -10.76 c0 -0.7 1 -0.74 1.22 -0.32 l4.22 8.34 l0 -8.02 c0 -0.42 0.32 -0.64 0.66 -0.64 s0.68 0.22 0.68 0.64 z M137.58 7.32 c1.82 0 3.76 0.7 3.76 2.76 c0 0.48 -0.32 0.7 -0.66 0.7 s-0.7 -0.24 -0.7 -0.7 c0 -0.16 -0.1 -1.46 -2.4 -1.46 c-1.82 0 -2.62 0.72 -2.62 2.44 l0 4.82 c0 1.74 0.98 2.28 2.62 2.28 c1.66 0 2.58 -0.68 2.58 -2.3 c0 -0.46 0.34 -0.68 0.66 -0.68 c0.34 0 0.66 0.22 0.66 0.68 c0 2.7 -1.5 3.6 -3.9 3.6 c-2.6 0 -3.92 -0.96 -3.92 -3.58 l0 -4.82 c0 -2.84 1.42 -3.74 3.92 -3.74 z M146.02 15.86 l0 -4.96 c0 -2.4 1.24 -3.68 3.64 -3.68 l0.52 0 c2.38 0 3.64 1.28 3.64 3.68 l0 4.96 c0 2.2 -1.46 3.64 -3.64 3.64 l-0.52 0 c-2.22 0 -3.64 -1.46 -3.64 -3.64 z M149.66 18.16 l0.52 0 c1.44 0 2.3 -0.9 2.3 -2.3 l0 -4.96 c0 -1.56 -0.76 -2.36 -2.3 -2.36 l-0.52 0 c-1.52 0 -2.36 0.82 -2.36 2.36 l0 4.96 c0 1.46 0.92 2.3 2.36 2.3 z M158.64000000000001 18.78 l0 -10.76 c0 -0.54 0.38 -0.66 0.66 -0.66 l3.2 0 c2.64 0 3.94 1.26 3.94 3.74 l0 5.12 c0 1.56 -1.22 3.2 -3.88 3.2 l-3.26 0 c-0.28 0 -0.66 -0.16 -0.66 -0.64 z M165.12 16.22 l0 -5.12 c0 -1.64 -0.88 -2.4 -2.62 -2.4 l-2.54 0 l0 9.42 l2.6 0 c1.22 0 2.56 -0.66 2.56 -1.9 z M171.24 18.78 l0 -10.78 c0 -0.42 0.32 -0.64 0.64 -0.64 s0.66 0.22 0.66 0.64 l0 10.78 c0 0.86 -1.3 0.86 -1.3 0 z M184.32000000000002 8 l0 10.76 c0 0.42 -0.32 0.64 -0.64 0.64 c-0.24 0 -0.56 -0.18 -0.7 -0.44 c-1.5 -2.94 -2.62 -5.2 -4.12 -8.16 l0 7.96 c0 0.42 -0.32 0.64 -0.66 0.64 c-0.32 0 -0.66 -0.22 -0.66 -0.64 l0 -10.76 c0 -0.7 1 -0.74 1.22 -0.32 l4.22 8.34 l0 -8.02 c0 -0.42 0.32 -0.64 0.66 -0.64 s0.68 0.22 0.68 0.64 z M189.18000000000004 15.879999999999999 l0 -4.82 c0 -2.88 1.58 -3.74 3.9 -3.74 c1.92 0 3.78 0.98 3.78 3 c0 0.44 -0.32 0.66 -0.66 0.66 s-0.68 -0.22 -0.68 -0.66 c0 -1.02 -1.12 -1.7 -2.44 -1.7 c-1.82 0 -2.58 0.74 -2.58 2.44 l0 4.82 c0 1.74 0.96 2.28 2.58 2.28 c1.92 0 2.6 -0.92 2.6 -2.7 l0 -0.84 l-1.8 0 c-0.42 0 -0.64 -0.32 -0.64 -0.66 s0.22 -0.68 0.64 -0.68 l2.5 0 c0.4 0 0.62 0.4 0.62 0.68 l0 1.5 c0 2.88 -1.12 4 -3.92 4 c-2.64 0 -3.9 -0.96 -3.9 -3.58 z"></path></g></svg> 

                    </div>
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Company
              </h1>
              <div className="flex flex-col gap-2">
                {["About", "Careers", "Affiliates"].map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.toLowerCase()}>{ele}</Link>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3 text-lg">
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
              <div></div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Resources
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>

              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Support
              </h1>
              <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                <Link to={"/help-center"}>Help Center</Link>
              </div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0 hidden md:block">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Plans
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Community
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="lg:w-[50%] md:flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3 hidden">
            {FooterLink2.map((ele, i) => {
              return (
                <div key={i} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                  <h1 className="text-richblack-50 font-semibold text-[16px]">
                    {ele.title}
                  </h1>
                  <div className="flex flex-col gap-2 mt-2">
                    {ele.links.map((link, index) => {
                      return (
                        <div
                          key={index}
                          className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                        >
                          <Link to={link.link}>{link.title}</Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto  pb-14 text-sm">
        {/* Section 1 */}
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {BottomFooter.map((ele, i) => {
              return (
                <div
                  key={i}
                  className={` ${
                    BottomFooter.length - 1 === i
                      ? ""
                      : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  } px-3 `}
                >
                  <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                    {ele}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center">Made by Gourab Bistu 🗿 © 2025 Lernify</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;