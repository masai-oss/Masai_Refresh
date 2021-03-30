import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import styled from "styled-components";
import styles from '../Styles/commonStyles.module.css'

export default function ReportDialog({question_id}) {
	const [open, setOpen] = useState(false)
	const [select, setSelect] = useState(-1)
	const [details, setDetails] = useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (submit) => {
		if(submit){
			
		}
    setOpen(false);
  };

	const handleDetailsChange = (e) => {
		setDetails(e.target.value)
	}

  return (
    <div>
      <IssueReport onClick={handleClickOpen}>
        Report an issue with the question
      </IssueReport>
      <Dialog
        open={open}
        onClose={handleClose}
				maxWidth={'lg'}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
					<h5 className={styles.paddingMarginNone}>
          	{"Report an issue with the question"}
					</h5>
        </DialogTitle>
				<Line />
        <DialogContent>
          <div>
						<h3>What seems to be the issue with the question?</h3>
						<TagsWrapper>
							{issues.map((el, i) => 
								<Tag onClick={() => setSelect(i)} selected={select === i}>{el}</Tag>	
							)}
						</TagsWrapper>
					</div>
					<div>
						<h3>Add Details</h3>
						<CustomizedTextArea onChange={handleDetailsChange} value={details} />
					</div>
					
        </DialogContent>
        <DialogActions style={{paddingBottom: '30px'}}>
          <CustomButton autoFocus onClick={() => handleClose(false)} color="primary" >
            Cancel
          </CustomButton>
          <CustomButton onClick={() => handleClose(true)} color="primary" autoFocus submitBtn={true}>
            Submit
          </CustomButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}


const issues = [
	'Question is Unclear',
	'Wrong Options',
	'Insufficient Data',
	'Explanation not Clear',
	'Others'
]


const IssueReport = styled.div`
  text-decoration-line: underline;
  cursor: pointer;
  font-size: 16px;
  color: #6C8D9E;
  margin: 10px 20px;
`

const Line = styled.div`
	background: lightgray;
	height: 1px;
`

const Tag = styled.button`
	font-size: 18px;
	color: ${props => props.selected ? 'white' : '#4E565A'};
	letter-spacing: 0.4px;
	background: ${props => props.selected ? '#2D799F' : 'rgba(108, 141, 158, 0.1)'};
	border: none;
	border-radius: 4px;
	padding: 12px 12px 12px 16px;
	margin: 0 10px 10px 0;
	cursor: pointer;

	:hover{
		background: ${props => props.selected ? '#2D799F' : 'rgba(37, 61, 73, 0.1)'};
	}
`
const TagsWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
`

const CustomizedTextArea = styled.textarea`
	resize: none;
	overflow: auto;
	border: none;
	background: rgba(108, 141, 158, 0.1);
	width:100%;
	height: 150px;
	
	:focus{
		outline: 1px solid rgba(27, 48, 59, 0.2);
	}
`

const CustomButton = styled.button`
	background: ${props => props.submitBtn ? '#2D799F' : 'rgba(108, 141, 158, 0.1)'};
	padding: 16px 25px;
	border: none;
	font-weight: bold;
	font-size: 18px;
	box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
	border-radius: 8px;
	color: ${props => props.submitBtn ? 'white' : '#21424A'};
	margin: 0px 10px;
	cursor: pointer;

	:focus{
		outline: none;
	}
`