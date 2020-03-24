import React, { useState, useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { DataQuery, useDataQuery, useDataEngine } from '@dhis2/app-runtime';
import i18n from '@dhis2/d2-i18n';
import OrgUnits from './components/OrgUnits';
import './App.css';
import { Card, MultiSelect, MultiSelectOption, MultiSelectField, Button, ButtonStrip, Table, TableHead, TableBody, TableRow, TableCellHead, TableCell } from '@dhis2/ui-core';
import ICUTable from './components/ICUTable';
import * as api from "./mockapi";
import { rootReducer } from './state/store';
import ICUBed from './components/ICUBed';
import ConfigureBedModal from './components/ConfigureBedModal';
import { setActiveICU, setMetaData } from './state/appState';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { getICUBeds, getMetaData, addBedEvent, removeBed } from './state/apiActions';
import RegisterPatientModal from './components/RegisterPatientModal';
import useConfirmation from './components/useConfirmationHook';

function getAttributeByName(bed, name) {
  for (var attrib of bed.attributes) {
    if (attrib.displayName === name) {
      return attrib.value;
    }
  }

  return "";
}

function ViewOrgICU() {
  const activeOrgUnit = useSelector(state => state.app.activeOrgUnit);
  const bedData = useSelector(state => state.app.icuList); // const [bedData, setBedData] = useState([]);

  useEffect(() => {// setBedData(api.getICUByOrgUnit("lka"))
  }, []);

  const onBedTypeChange = () => {};

  if (!activeOrgUnit) {
    return <p>Please select an organization unit</p>;
  }

  if (activeOrgUnit.level === 6) {
    return <ViewICUBeds />;
  }

  return activeOrgUnit.level < 6 && <>
                <span className="t20">Showing ICU Bed data for <b>{activeOrgUnit.name}</b></span>
                <div className="filter-area">
                    
                        <MultiSelect placeholder="ICU Type" onChange={onBedTypeChange}>
                            <MultiSelectOption value="type01" label="Medical" />
                            <MultiSelectOption value="type01" label="Surgical" />
                            <MultiSelectOption value="type01" label="Neurosurgical" />
                            <MultiSelectOption value="type01" label="Pediatric" />
                            <MultiSelectOption value="type01" label="Neonatal" />
                            <MultiSelectOption value="type01" label="Other" />
                        </MultiSelect>
                        <MultiSelect placeholder="Bed Type" onChange={onBedTypeChange}>
                            <MultiSelectOption value="type01" label="Type 01" onClick={onBedTypeChange} />
                        </MultiSelect>
                        <MultiSelect placeholder="Diagnosis Type" onChange={onBedTypeChange}>
                            <MultiSelectOption value="type01" label="Type 01" onClick={onBedTypeChange} />
                        </MultiSelect>
                    
                </div>
                <div className="icu-table">
                    <ICUTable data={bedData} />
                </div>
            </>;
}

function ViewICUBeds() {
  const activeOrgUnit = useSelector(state => state.app.activeOrgUnit);
  const activeICU = useSelector(state => state.app.activeICU);
  const metaData = useSelector(state => state.app.metaData);
  const programStage = useSelector(state => state.app.ICUEventId);
  const [showConfigure, setShowConfigure] = useState(false);
  const [bedModalOpen, setBedModalOpen] = useState(false);
  const [patientModalOpen, setPatientModalOpen] = useState(false);
  const [selectedBed, setSelectedBed] = useState(null);
  const dispatch = useDispatch();
  const confirmation = useConfirmation();
  useEffect(() => {
    if (metaData) {
      dispatch(getICUBeds(activeICU.id, metaData.id));
    }
  }, [metaData, activeICU.id]); // useEffect(() => {
  //     if(metaData){
  //         dispatch(getICUBeds(activeICU.id, metaData.id));
  //     }        
  // }, [activeICU.id]);

  const onViewBed = bed => {
    setSelectedBed(bed);
    setBedModalOpen(true);
  };

  const onOccupyBed = bed => {
    setSelectedBed(bed);
    setPatientModalOpen(true); // dispatch(addBedEvent(bed.trackedEntityInstance, metaData.id, programStage, activeICU.id, "Admitted"));
  };

  const onReserveBed = bed => {
    confirmation.show("Do you want to confirm reserving this bed?", () => dispatch(addBedEvent(bed.trackedEntityInstance, metaData.id, programStage, activeICU.id, "Reserved")), () => {});
  };

  const onDischargeBed = bed => {
    confirmation.show("Do you want to confirm discharging this bed?", () => dispatch(addBedEvent(bed.trackedEntityInstance, metaData.id, programStage, activeICU.id, "Discharged")), () => {});
  };

  if (!activeOrgUnit) {
    return <p>Please select an organization unit</p>;
  }

  return <>
            <div className="inner-header">
                <span className="t20">Showing ICU Bed status at <b>{activeOrgUnit.name}</b></span>
                <Button onClick={() => setShowConfigure(true)} className="pull-right">Configure Beds</Button>
            </div>
            {activeICU && <>
                    {showConfigure && <ViewConfigureBeds onBack={() => setShowConfigure(false)} />}
                    {!showConfigure && <div className="icu-bed-container">
                            {!activeICU.beds.length && <p>No beds currently added</p>}
                            {activeICU.beds.map((bed, key) => <ICUBed key={key} name={getAttributeByName(bed, "ICU - Bed Number")} status={bed.status ? bed.status : "IDLE"} onView={() => onViewBed(bed)} onOccupy={() => onOccupyBed(bed)} onDischarge={() => onDischargeBed(bed)} onReserve={() => onReserveBed(bed)} />)}
                        </div>}
                </>}
            {bedModalOpen && <ConfigureBedModal open={bedModalOpen} onClose={() => setBedModalOpen(false)} selectedBed={selectedBed} editable={false} />}
            {patientModalOpen && <RegisterPatientModal open={patientModalOpen} onClose={() => setPatientModalOpen(false)} selectedBed={selectedBed} />}
        </>;
}

function ViewConfigureBeds({
  onBack
}) {
  const [bedModalOpen, setBedModalOpen] = useState(false);
  const dispatch = useDispatch();
  const activeICU = useSelector(state => state.app.activeICU);
  const metaData = useSelector(state => state.app.metaData);
  const [selectedBed, setSelectedBed] = useState(null);
  const confirmation = useConfirmation(); // useEffect(() => {
  //     dispatch(getICUBeds(activeICU.id, metaData.id));
  // }, []);

  const onAddBed = () => {
    setSelectedBed(null);
    setBedModalOpen(true);
  };

  const onSelectBed = bed => {
    setSelectedBed(bed);
    setBedModalOpen(true);
  };

  const onRemoveBed = bed => {
    confirmation.show("Do you really want to remove this bed?", () => {
      dispatch(removeBed(activeICU.id, bed.enrollments[0].enrollment));
    }, () => {});
  };

  return <>
            <div className="inner-header">
                <ButtonStrip end>
                    <Button onClick={onBack}>Back</Button>
                    <Button primary onClick={onAddBed}>Add New Bed</Button>
                </ButtonStrip>
            </div>
            <div className="inner-container">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCellHead>Bed No</TableCellHead>  
                            <TableCellHead>Bed Type</TableCellHead>
                            <TableCellHead>Covid Type</TableCellHead> 
                            <TableCellHead>Action</TableCellHead> 
                        </TableRow>
                    </TableHead>
                    {activeICU && <TableBody>
                            {activeICU.beds.map((bed, key) => <TableRow key={key}>
                                    <TableCell>{getAttributeByName(bed, "ICU - Bed Number")}</TableCell>
                                    <TableCell>{getAttributeByName(bed, "ICU - Type")}</TableCell>
                                    <TableCell>{getAttributeByName(bed, "ICU - COVID Type")}</TableCell>
                                    <TableCell>
                                        <ButtonStrip>
                                            <Button onClick={() => onSelectBed(bed)}>View Details</Button>
                                            <Button destructive onClick={() => onRemoveBed(bed)}>Remove</Button>
                                        </ButtonStrip>
                                    </TableCell>
                                </TableRow>)}
                        </TableBody>}
                </Table>
            </div>
            {bedModalOpen && <ConfigureBedModal open={bedModalOpen} onClose={() => setBedModalOpen(false)} selectedBed={selectedBed} editable={true} />}
        </>;
}

function ContainerView({
  children
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMetaData());
  }, []);
  return <div style={{
    height: "100vh"
  }}>
            {children}
        </div>;
}

function MyApp() {
  const dhisEngine = useDataEngine();
  const customizedMiddleware = getDefaultMiddleware({
    thunk: {
      extraArgument: dhisEngine
    }
  });
  const store = configureStore({
    reducer: rootReducer,
    middleware: customizedMiddleware
  });
  return <Provider store={store}>
            <ContainerView>
                <div className="container">
                    <div className="left-column">
                        <OrgUnits />
                    </div>
                    <div className="right-column">
                        <ViewOrgICU />
                        {
            /* <ViewICUBeds /> */
          }
                        {
            /* <ViewConfigureBeds /> */
          }
                    </div>
                </div>
            </ContainerView>
        </Provider>;
}

export default MyApp;