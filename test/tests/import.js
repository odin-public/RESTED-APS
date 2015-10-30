'use strict';

describe('Service: Import', function () {

  // load the controller's module
  beforeEach(angular.mock.module('RestedApp'));

  var expectedResult = [
    {
      url: 'www.vg.no',
      method: 'GET',
      data: 'username=admin&password=awesome',
      headers: [
        {
          name: 'Content-Type',
          value: 'angular/awesomeness'
        }
      ]
    }
  ];

  // instantiate service
  var Import;
  beforeEach(inject(function (_Import_) {
    Import = _Import_;
  }));

  it('should load the service', function () {
    expect(!!Import).toBe(true);
  });

  it('should have a HAR import method', function () {
    expect(Import.fromHAR).toBeDefined();
    expect(typeof Import.fromHAR).toBe('function');
  });

  it('should have a Postman import method', function () {
    expect(Import.fromPostman).toBeDefined();
    expect(typeof Import.fromPostman).toBe('function');
  });

  it('should convert HAR to correct format when invoked', function () {
    var HAR = {
      "log": {
        "entries": [
          {
            "request": {
              "method": "GET",
              "url": "www.vg.no",
              "headers": [
                {
                  "name": "Content-Type",
                  "value": "angular/awesomeness"
                }
              ],
              "postData": {
                "mimeType": "application/x-www-form-urlencoded",
                "params": [
                  {
                    "name": "a",
                    "value": "b"
                  },
                  {
                    "name": "c",
                    "value": "d"
                  }
                ],
                "text": "username=admin&password=awesome"
              }
            }
          }
        ]
      }
    };
    expect(Import.fromHAR(HAR)).toEqual(expectedResult);
  });

  it('should convert Postman json to correct format when invoked', function () {
    var postmanJson = {
      "name": "Test collection",
      "requests": [
        {
          "headers": "Content-Type: angular/awesomeness\n",
          "url": "www.vg.no",
          "method": "GET",
          "data": [
            {
              "key": "username",
              "value": "admin",
              "type": "text",
              "enabled": true
            },
            {
              "key": "password",
              "value": "awesome",
              "type": "text",
              "enabled": true
            }
          ]
        }
      ],
    };
    expect(Import.fromPostman(postmanJson)).toEqual(expectedResult);
  });

});