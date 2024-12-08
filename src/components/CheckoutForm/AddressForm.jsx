import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link, StaticRouterProvider } from 'react-router-dom';

        const AddressForm = ({ checkoutToken, test }) => {
            const [shippingCountries, setShippingCountries] = useState([]);
            const [shippingCountry, setShippingCountry] = useState('');
            const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
            const [shippingSubdivision, setShippingSubdivision] = useState('');
            const [shippingOptions, setShippingOptions] = useState([]);
            const [shippingOption, setShippingOption] = useState('');
            const methods = useForm();

            const fetchShippingCountries = async (checkoutTokenId) => {
                const { countries } = await Commerce.service.localeListShippingCountries(checkoutTokenId);
                
                setShippingCountries(countries);
                setShippingCountries(Object.keys(countries)[0]);
            };

            const fetchSubdivisions = async (countryCode) => {
                const { subdivisions } = await Commerce.service.localeListSubdivisions(countryCode);

                setShippingSubdivisions(subdivisions);
                setShippingSubdivisions(Object.keys(subdivisions));
            };

            const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
                const options = await Commerce.checkout.getShippingOptions(checkoutTokenId, {country, regions: stateProvince });

                setShippingOption(options);
                setShippingOptions(options[0].id);
            };
                useEffect(() => {
                    fetchShippingCountries(checkoutToken.id);
                }, []);
                useEffect(() => {
                    if(shippingCountry) fetchSubdivisions(shippingCountry);
                }, [shippingCountry]);
                useEffect(() => {
                    if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
                }, [shippingSubdivision]);
         }

          return (
            <>
                <Typography variant='h6' gutterBottom>Shipping address</Typography> 
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit((data) => test({...data, shippingCountry, shippingSubdivision, shippingOptions}))}>
                        <Grid container spacing={3}> 
                            <FormInput required name="firstName" lable="First name" />
                            <FormInput required name="lastName" lable="Last name" />
                            <FormInput required name="address1" lable="Address line 1" />
                            <FormInput required name="email" lable="Email " />
                            <FormInput required name="city" lable="City" />
                            <FormInput required name="zip" lable="Zip / Postal code" />
                            <Grid item xs={12} sm={6}>
                                <InputLabel>Shipping Country</InputLabel>
                                <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                    {Object.entries(shippingCountries).map(([code, name]) => ({id: code, lable: name})).map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.lable}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel>Shipping Subdivision</InputLabel>
                                <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                    {Object.entries(shippingSubdivision).map(([code, name]) => ({id: code, label: name})).map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.lable}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <InputLabel>Shipping Options</InputLabel>
                                            <Select value={shippingOptions}  fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                                            { shippingOption.map((sO) => ({id: sO.id, lable: `${sO.description} - (${sO.price.formatted_with_symbol})`})).map((item) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.lable}
                                                </MenuItem>
                                                ))}
                                            </Select>
                                                        
                                    </Grid>
                        </Grid>
                        <br />
                        <div style={{display: 'flex', justifyContent: 'space-between' }}>
                            <Button component={Link} variant='outlined' to='/cart'>Back to Cart</Button>
                            <Button type="submit" variant="contained" color="primary">Next</Button>
                        </div>
                    </form>
                </FormProvider>
            </>
          );

export default AddressForm;
