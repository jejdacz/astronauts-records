import React, { Fragment } from "react";
import PageHeader from "./PageHeader/PageHeader.js";
import PageContent from "./PageContent/PageContent.js";

const Page = ({ header, content }) => (
  <Fragment>
    <PageHeader>{header}</PageHeader>
    <PageContent>{content}</PageContent>
  </Fragment>
);

export default Page;
