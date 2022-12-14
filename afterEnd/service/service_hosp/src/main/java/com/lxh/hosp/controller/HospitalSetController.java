package com.lxh.hosp.controller;

import com.lxh.hosp.mapper.hospSetMapper;
import com.lxh.hosp.service.impl.HospitalSetService;
import com.lxh.mybatis.entity.hospSet;

import com.lxh.utils.result.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/hosp/hospitalList")
public class HospitalSetController {
    // 注入service进行调用
    @Autowired
    private HospitalSetService hospitalSetService;

    @GetMapping("findAll")
    public Result findAllHospitalSet() {
        // 调用hospitalSetService的方法
        List<hospSet> list = hospitalSetService.list();
        return Result.success(list);
    }
    @PostMapping("edit")
    public Result editHospitalInfo(@RequestBody hospSet hospInfo) {
        boolean result = hospitalSetService.updateById(hospInfo);
        System.out.println(result);
        return Result.success(result);
    }
}
