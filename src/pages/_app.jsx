import styled from "styled-components";
import { DefaultSeo } from "next-seo";
import { MDXProvider } from "@mdx-js/react";
import Zoom from "react-medium-image-zoom";
import { Header } from "components/header";
import { Menu } from "components/menu";
import "react-medium-image-zoom/dist/styles.css";
import "../style.css";
import "../styles/prism.css";

import SEO from "../../next-seo.config";

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 30rem 1fr;
  grid-template-rows: 65px auto;
  grid-template-areas:
    "header header"
    "menu main";

  @media only screen and (max-width: 980px) {
    grid-template-columns: 1fr;
    grid-template-rows: 65px auto;
    grid-template-areas:
      "header header"
      "main main";
  }

  .menu-container {
    grid-area: menu;
    height: calc(100vh - 65px);
    overflow-y: auto;
    background: #f5f7f9;

    @media only screen and (max-width: 980px) {
      display: none;
    }

    .menu-content {
      /* width: 30rem; */
      /* float: right; */
      padding: 1rem 2rem;
    }
  }

  .main-container {
    grid-area: main;
    height: calc(100vh - 65px);
    overflow-y: auto;
    padding: 0 3rem;
    padding-bottom: 10rem;

    .main-container-width {
      max-width: 70rem;
      @media only screen and (max-width: 980px) {
        max-width: 100%;
      }
    }
  }

  .discort-button-style {
    position: absolute;
    bottom: 0;
    right: 3rem;
    font-size: 1.4rem;
    padding: 1rem 1rem 0.3rem;
    box-shadow: 0 0 8px 2px rgba(116, 129, 141, 0.1);

    &:hover {
      background: #f5f7f9;
      box-shadow: 0 0 8px 2px rgba(116, 129, 141, 0.3);
    }

    a {
      display: flex;
      align-items: center;
    }

    img {
      width: 30px;
      margin-right: 0.7rem;
    }
  }
`;

const mdComponents = {
  h1: (props) => {
    let link_id = "";
    try {
      link_id = props.children.replace(/ /g, "-").toLowerCase();
    } catch (error) {
      console.log("unable to to use .replace");
      console.log(props.children);
    }
    return (
      <a href={`#${link_id}`}>
        <h1 id={link_id} {...props} />
      </a>
    );
  },
  h2: (props) => {
    let link_id = "";
    try {
      link_id = props.children.replace(/ /g, "-").toLowerCase();
    } catch (error) {
      console.log("unable to to use .replace");
      console.log(props.children);
    }
    return (
      <a href={`#${link_id}`}>
        <h2 id={link_id} {...props} />
      </a>
    );
  },
  img: ({ src, alt }) => {
    return (
      <Zoom>
        <img src={src} alt={alt} className="img-md" />
      </Zoom>
    );
  },
  inlineCode: ({ children }) => {
    return <code className="inline-code">{children}</code>;
  },
};

export default function App({ Component, pageProps }) {
  return (
    <MDXProvider components={mdComponents}>
      <DefaultSeo {...SEO} />
      <AppContainer>
        <Header />
        <div className="menu-container">
          <div className="menu-content">
            <Menu />
          </div>
        </div>
        <div className="main-container">
          <div className="main-container-width">
            <Component {...pageProps} />
          </div>
        </div>
        <div className="discort-button-style">
          <a href="https://nhost.io/discord" target="_blank">
            <img src="/images/icon-discord.png" alt="" />
            Chat with us at Discord
          </a>
        </div>
      </AppContainer>
    </MDXProvider>
  );
}
