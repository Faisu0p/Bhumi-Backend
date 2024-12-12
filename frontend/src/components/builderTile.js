import React, { useState, useEffect } from "react";
import { getAllBuilders } from "../apis/builderApi";

const builderTile = () => {
  const [builder, setbuilder] = useState([]);

  useEffect(() => {
    const fetchbuilders = async () => {
      const builderdata = await getAllBuilders();
      console.log(builderdata);
    };

    fetchbuilders();
  }, []);
};
