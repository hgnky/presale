import { useCallback, useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSelector, useDispatch } from "react-redux";
import TabPanel from "../../components/TabPanel";
import { changeApproval, changeClaim } from "../../slices/ClaimThunk";
import { useWeb3Context } from "src/hooks/web3Context";
import {
  Paper,
  Grid,
  Typography,
  Box,
  Zoom,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import { trim } from "../../helpers";
import "./referral.scss";
import { Skeleton } from "@material-ui/lab";
import { error } from "../../slices/MessagesSlice";
import { ethers, BigNumber } from "ethers";
import { getAddress } from "@ethersproject/address";
import rot13 from "src/encode";

function Claim() {
  const { provider, address, connected, connect, chainID } = useWeb3Context();
  
  const [isCopied, setIsCopied] = useState(false);

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  console.log('debug', address)
  return (
    <div id="dashboard-view">
      <div className="presale-header">
        <h1>Referral</h1>
        <p>Share the referral link below to invite your friends and earn <b>5%</b> of your friends' claiming.</p>
      </div>
      <Paper className={`ohm-card`}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <div className="card-header">
              <Typography variant="h5">Your Referral Link</Typography>
            </div>
          </Grid>
        </Grid>
        <Grid item>
          <div className="stake-top-metrics" style={{ whiteSpace: "normal" }}>
            <Box alignItems="center" justifyContent="center" flexDirection="column" display="flex">
              {address ? (
                    <>
                        <Box mb="24px">
                            <Typography variant="body1" className="referral-link" color="textSecondary">
                            <>
                              https://presale-olive.vercel.app/#/presale?ref={rot13(address)}
                            </>
                            </Typography>
                        </Box>
                        <Box>
                            <CopyToClipboard text={`https://presale-olive.vercel.app/#/presale?ref=${rot13(address)}`} onCopy={onCopyText}>
                                <div className="copy-area">
                                    <Button
                                        className="copy-button"
                                        variant="contained"
                                        color="primary"
                                    >
                                        {isCopied ? "Copid" : "Copy"}
                                    </Button>
                                </div>
                            </CopyToClipboard>
                        </Box>
                  </>
                ) : (
                    <Box className="help-text">
                      <Typography variant="body" className="stake-note" color="textSecondary">
                        <>
                          Connect Wallet to get your unique referral link.
                        </>
                      </Typography>
                    </Box>
                )}
            </Box>
          </div>
        </Grid>
      </Paper>
    </div>
  );
}

export default Claim;