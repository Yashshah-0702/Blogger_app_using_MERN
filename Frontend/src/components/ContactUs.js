import React from "react";

export default function ContactUs() {
  return (
    <>
      <h1
        className="my-5 text-center bg-dark bg-gradient text-white pt-5 rounded-3 border-top border-3 border-light"
        style={{ height: "150px" }}
      >
        🄲🄾🄽🅃🄰🄲🅃 🅄🅂
      </h1>
      <p className="text-center container h-auto" style={{height:"200px"}} >
        【﻿Ｄｏ　ｙｏｕ　ｎｅｅｄ　ｗｅｂｓｉｔｅ　ｐｌａｎｎｉｎｇ？　Ｄｏ　ｙｏｕ　ｎｅｅｄ　ｗｅｂｓｉｔｅ　ｄｅｓｉｇｎｉｎｇ？{" "}
        <br></br>
        Ｗｅ　ｃａｎ　ｈｅｌｐ　ｙｏｕｒ　ｗｅｂ　ｄｅｓｉｇｎ　ｗｉｓｈｅｓ　ｃｏｍｅ　ｔｒｕｅ．　Ｆｉｒｓｔ，　ｅｎｔｅｒ　ｙｏｕｒ　
        <br></br>ｉｎｆｏｒｍａｔｉｏｎ
        ｏｎ　ｔｈｉｓ　ｆｏｒｍ．　Ｗｅ　ｗｉｌｌ　ｃｏｍｍｕｎｉｃａｔｅ　ｗｉｔｈ　ｙｏｕ　ａｎｄ　ｌｏｏｋ　ｆｏｒｗａｒｄ{" "}
        <br></br>　ｔｏ ｈｅａｒｉｎｇ　ｙｏｕｒ　ｉｄｅａｓ．】
      </p>
      <div className="rounded-3 mb-5 p-3">
        <form className="container">
          <div className="d-lg-flex  mt-3 ">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="form-control border-start-0 p-3  rounded-0"
            />
            {/* <label>Email</label> */}
            <input
              type="email"
              id="email"
              name="email"
              placeholder="E-mail"
              className="form-control border-start-0 p-3 border-end-0 rounded-0"
            />
          </div>
          <div className="mb-3 ">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              className="form-control border-start-0 p-3 border-end-0 rounded-0"
            />
            <textarea
              placeholder="Message"
              className="form-control border-start-0 p-3 border-end-0 rounded-0"
              rows={5}
            ></textarea>
          </div>
        </form>
      </div>
    </>
  );
}
