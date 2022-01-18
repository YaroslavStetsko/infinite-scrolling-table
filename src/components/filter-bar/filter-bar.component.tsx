import { Formik, Field, Form } from "formik";
import React from "react";
import styles from "./filter-bar.module.scss";

import TagItem from "./tag-item/tag-item.component";
import { InitialValues } from "../../App.types";
import { filterBarProps } from "./filter-bar.props";
import { useFilterBarData } from "./filter-bar.hook.component";
import Preloader from "../../core/components/preloader/preloader.component";

const FilterBar: React.FC<filterBarProps> = ({
  tags,
  setFilters,
  preloaderStatus,
  deleteTag,
}) => {
  const { initialValues, validationSchema } = useFilterBarData();

  const formSubmit = (values: InitialValues | any) => {
    let includeTagsArr = [];
    let excludeTagsArr = [];

    for (let key in values) {
      if (values[key]) {
        if (key.split("include_").length > 1) {
          includeTagsArr.push(key.replace("include_", ""));
        } else if (key.split("exclude_").length > 1) {
          excludeTagsArr.push(key.replace("exclude_", ""));
        }
      }
    }
    setFilters({
      minMaxData: {
        sentMin: values.sentMin,
        sentMax: values.sentMax,
        receivedMax: values.receivedMax,
        receivedMin: values.receivedMin,
      },
      excludeTagsArr: excludeTagsArr,
      includeTagsArr: includeTagsArr,
    });
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.header}>
        <div className={styles.title}>Audence</div>
        <div>100 Contacts</div>
      </div>

      <div className={styles.Message}>
        <Formik
          initialValues={initialValues}
          onSubmit={formSubmit}
          validationSchema={validationSchema}
        >
          {({}) => (
            <React.Fragment>
              <Form>
                <div className={styles.tags}>
                  <div>Include tags:</div>
                  <div className={styles.tagsItems}>
                    {preloaderStatus ? (
                      <Preloader small={true} />
                    ) : (
                      tags?.tags?.map((el, i) => (
                        <TagItem
                          key={i}
                          item={el}
                          deleteTag={deleteTag}
                          includeTag={true}
                        />
                      ))
                    )}
                  </div>
                </div>
                <div className={styles.tags}>
                  <div>Exclude tags:</div>
                  <div className={styles.tagsItems}>
                    {preloaderStatus ? (
                      <Preloader small={true} />
                    ) : (
                      tags?.tags?.map((el, i) => (
                        <TagItem key={i} item={el} deleteTag={deleteTag} />
                      ))
                    )}
                  </div>
                </div>
                <label>Message sent:</label>
                <div className={styles.inputs}>
                  <Field
                    id="sentMin"
                    name="sentMin"
                    type="number"
                    placeholder="min"
                  />
                  <Field
                    id="sentMax"
                    type="number"
                    name="sentMax"
                    placeholder="max"
                  />
                </div>
                <label>Message received:</label>
                <div className={styles.inputs}>
                  <Field
                    id="receivedMin"
                    type="number"
                    name="receivedMin"
                    placeholder="min"
                  />
                  <Field
                    id="receivedMax"
                    type="number"
                    name="receivedMax"
                    placeholder="max"
                  />
                </div>
                <button type="submit">Save Filters</button>
              </Form>
            </React.Fragment>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FilterBar;
