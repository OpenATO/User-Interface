import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { CATALOG_DISPLAY_NAMES, DEFAULT_CATALOG_VERSION } from "../constants";
import { config } from "../config";
import RequestService from "../services/RequestService";

import ErrorMessage from "../molecules/ErrorMessage";
import SearchLibrary from "../templates/SearchLibrary";

const ERROR_MESSAGE = "Error loading components";

const ComponentLibrary = () => {
  const urlParams = useLocation();

  const [componentList, setComponentList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [, setCatalogList] = useState([]);
  const [hasError, setHasError] = useState(false);

  const getParams = urlParams.search;

  const getSearch = useCallback(() => {
    RequestService.get(
      `${config.backendUrl}/components/search/${getParams}`,
      (response) => {
        setComponentList(response.data);
      },
      (err) => {
        throw err;
      }
    );
  }, [getParams]);

  const getTypes = () => {
    RequestService.get(
      `${config.backendUrl}/components/types/`,
      (response) => {
        setTypeList(response.data);
      },
      (err) => {
        throw err;
      }
    );
  };

  const getCatalogs = () => {
    RequestService.get(
      `${config.backendUrl}/catalogs/`,
      (response) => {
        setCatalogList(response.data);
      },
      (err) => {
        throw err;
      }
    );
  };

  useEffect(() => {
    try {
      getSearch();
      getTypes();
      getCatalogs();
    } catch (error) {
      return setHasError(true);
    }
  }, [getSearch]);

  if (hasError) {
    return <ErrorMessage message={ERROR_MESSAGE} />;
  }
  return (
    <>
      <h1>Component Library</h1>
      <SearchLibrary
        componentList={componentList.results}
        typeList={typeList}
        totalItemCount={componentList.count}
      />
    </>
  );
};

export default ComponentLibrary;
