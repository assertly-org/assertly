import React, { Component } from "react";

export default class Assertly extends Component {
  componentDidMount(prevProps) {
    console.log("render assertly once only");

    let PORT;
    if (process.env.PORT !== undefined) {
      PORT = parseInt(process.env.ASSERTLY_PORT);
    } else {
      PORT = 3002;
    }

    const useAssertly = true;
    const apiKey = "1a7e9a24-fc8d-4004-95d8-e7e9b8631bed";

    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;

    if (useAssertly) {
      s.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'assertly.start':
                new Date().getTime(),event:'assertly.js','apiKey':i});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                '//localhost:${PORT}/api/assertly-client/assertly.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${apiKey}')`;
      this.instance.appendChild(s);
    }
  }

  render() {
    return <div ref={el => (this.instance = el)} />;
  }
}
