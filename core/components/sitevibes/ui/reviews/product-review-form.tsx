'use client';

import { useEffect, useState } from 'react';
import { ProductReviewFormWidgetProps } from './types';
import styles from '../style.module.css';

export default function ProductReviewForm(props: ProductReviewFormWidgetProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState('');

  useEffect(() => {
    if (props.customerAccount) {
      setEmail(props.customerAccount.email);
      setName(`${props.customerAccount.firstName} ${props.customerAccount.lastName}`);
    }
  }, []);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const submitReview = () => {
    let valid = true;
    setEmailError('');
    setNameError('');
    setTitleError('');
    setContentError('');

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    }

    if (email && !validateEmail(email)) {
      setEmailError(`${email} is not a valid email address`);
      valid = false;
    }

    if (!name) {
      setNameError('Name is required');
      valid = false;
    }

    if (!title) {
      setTitleError('Title is required');
      valid = false;
    }

    if (!content) {
      setContentError('Content is required');
      valid = false;
    }

    if (!valid) {
      return;
    }

    // sdk
    //   .callAction<{ status: boolean }>({
    //     actionName: 'sitevibes/create-product-review',
    //     payload: {
    //       product_id: props.product_id,
    //       email,
    //       name,
    //       title,
    //       content,
    //       rating: props.selectedRating,
    //     },
    //   })
    //   .then((response) => {
    //     if (response.isError || (!response.isError && !response.data.status)) {
    //       console.error('### create-product-view error ###', response);
    //     } else {
    //       props.onReviewSubmitted();
    //     }
    //   })
    //   .catch((err) => {
    //     console.error('### create-product-view error ###', err);
    //   });
  };

  return (
    <div className={styles.container}>
      <div className={styles.field_group}>
        <label>Email:</label>
        <div>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          {emailError && <span className={styles.error_text}>{emailError}</span>}
        </div>
      </div>
      <div className={styles.field_group}>
        <label>Name:</label>
        <div>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          {nameError && <span className={styles.error_text}>{nameError}</span>}
        </div>
      </div>
      <div className={styles.field_group}>
        <label>Title:</label>
        <div>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          {titleError && <span className={styles.error_text}>{titleError}</span>}
        </div>
      </div>
      <div className={styles.field_group}>
        <label>Content</label>
        <div>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
          {contentError && <span className={styles.error_text}>{contentError}</span>}
        </div>
      </div>

      <button className={styles.primary_button} onClick={submitReview}>
        {props.t.submit_review_btn_label}
      </button>
    </div>
  );
}
