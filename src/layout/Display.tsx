import React, { useEffect, useState } from "react";
import { JsonForms } from "@jsonforms/react";
import {
    materialCells,
    materialRenderers,
} from "@jsonforms/material-renderers";
import RatingControl from "../renderers/Rating/RatingControl";
import ratingControlTester from "../renderers/Rating/ratingControlTester";
import imageControlTester from "../renderers/Image/imageControlTester";
import ImageControl from "../renderers/Image/ImageControl";
import htmlControlTester from "../renderers/Html/htmlControlTester";
import HtmlControl from "../renderers/Html/HtmlControl";
import gridControlTester from "../renderers/Array/gridControlTester";
import GridControl from "../renderers/Array/GridControl";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ScopedCssBaseline } from "@mui/material";
import { grey } from "@mui/material/colors";

/****************************************************************************
 * <b>Title:</b> Display.tsx
 * <b>Project:</b> schema-display-ui
 * <b>Description:</b> Main file to display the apppriate schema in the 
 * component.  Load all of the renderers needed to display 
 * <b>Copyright:</b> Copyright (c) 2021
 * <b>Company:</b> Silicon Mountain Technologies
 * 
 * @author James Camire
 * @version 3.0
 * @since Feb 17, 2023
 * <b>updates:</b>
 * 
 ****************************************************************************/
function Display() {
    const [formData, setFormData] = React.useState({});
    const [title, setTitle] = React.useState("We welcome your feedback");
    const [schema, setSchema] = React.useState({});
    const [uischema, setUischema] = React.useState({ type: 'UISchemaElement' });
    const theme = createTheme({ palette: { secondary: grey } });

    //Register the Material and Customer Rating Renderer
    const renderers = [
        ...materialRenderers,
        //register custom renderers
        { tester: ratingControlTester, renderer: RatingControl },
        { tester: imageControlTester, renderer: ImageControl },
        { tester: htmlControlTester, renderer: HtmlControl },
        { tester: gridControlTester, renderer: GridControl }
    ];

    /**
     * Effects to load the schma for display purposes
     */
    useEffect(() => {
        (async () => {
            let res = await loadData();
            if (res.success) {
                setSchema(res.data.schema);
                setTitle(res.data.uischema.title);
                setUischema(res.data.uischema)
            }
        })();
    }, []);

    /**
     * Loads the json schema file
     */
    const loadData = async () => {
        try {
            let response = await fetch('/binary/help_hmf_schema.json');
            let json = await response.json();
            return { success: true, data: json };
        } catch (_error) {
            console.log("Error", _error);
        }
    }

    /**
     * Renders the ui schema to the display
     */
    return (

        <ThemeProvider theme={theme}>
            <ScopedCssBaseline>
                <h1>{title}</h1>
                <JsonForms
                    schema={schema}
                    uischema={uischema}
                    data={formData}
                    renderers={renderers}
                    cells={materialCells}
                    onChange={({ data }) => {
                        setFormData(data);
                    }}
                />
            </ScopedCssBaseline>
        </ThemeProvider>

    );
}

export default Display;